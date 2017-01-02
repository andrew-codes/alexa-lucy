import unique from 'uniqueid';
import {PropTypes} from 'react';
import {Effects, liftState, loop} from 'redux-loop';
import {List, Map} from 'immutable';
import {createModule} from 'redux-modules';
import * as roombaApi from './../api/Roomba';

const createId = unique('Roomba:', ':0');

const name = 'Roomba';

const defaultState = {
    errors: new List(),
    roombas: new Map()
};

const init = (state) => ({
    ...state,
    roombas: new Map().mergeDeep(state.roombas)
});

const create = {
    reducer: (state) => {
        const oid = createId();
        return {
            ...state,
            selectedRoomba: oid,
            roombas: state.roombas.mergeDeep({
                [oid]: {
                    address: '',
                    name: '',
                    oid,
                    spaces: new List()
                }
            })
        };
    }
};

const update = {
    payloadTypes: {
        oid: PropTypes.string.isRequired
    },
    reducer: (state, {payload}) => ({
        ...state,
        roombas: state.roombas.mergeDeep({
            [payload.oid]: {
                ...payload,
                saved: false
            }
        })
    })
};

const updateCleaningSpace = {
    payloadTypes: {
        oid: PropTypes.string.isRequired,
        space: PropTypes.bool.isRequired,
    },
    reducer: (state, {payload}) => ({
        ...state,
        roombas: state.roombas.updateIn([payload.oid, 'spaces'], (list) => {
            if (payload.add) {
                return list.push(payload.space);
            }
            return list.filter(item => item !== payload.space);
        })
    })
};

const save = {
    reducer: (state, {payload}) => loop(
        state,
        Effects.promise(roombaApi.save, state.roombas.filter((roomba) => !roomba.saved).toArray())
    )
};

const allSavedSuccess = {
    payloadTypes: PropTypes.arrayOf(PropTypes.string),
    reducer: (state, {payload}) => loop(
        {
            ...state,
            errors: new List()
        },
        Effects.batch(payload.map(oid =>
            Effects.constant(RoombaModule.actions.saveSuccess({oid}))
        ))
    )
};

const saveSuccess = {
    payloadTypes: {
        clientOid: PropTypes.string,
        oid: PropTypes.string,
    },
    reducer: (state, {payload}) => ({
        ...state,
        roombas: state.roombas.mergeDeep({
            [payload.oid]: {
                ...state.roombas.get(payload.clientOid),
                saved: true
            }
        }).remove(payload.clientOid)
    })
};

// Action when only some were successful. Payload has successful oid array, and failure array with oid: error message key value pair.
const allSavedFailure = {
    payloadTypes: {
        saved: PropTypes.arrayOf(PropTypes.string),
        failed: PropTypes.arrayOf(PropTypes.shape({
            oid: PropTypes.string,
            error: PropTypes.string
        }))
    },
    reducer: (state, {payload}) => loop(
        {
            ...state,
            error: new List(payload.failed)
        },
        Effects.batch(payload.saved.map(oid =>
            RoombaModule.actions.saveSuccess({oid})
        ))
    )
};

const RoombaModule = createModule({
    name,
    defaultState,
    composes: [liftState],
    transformations: {
        allSavedFailure,
        allSavedSuccess,
        init,
        create,
        save,
        update,
        saveSuccess,
        updateCleaningSpace,
    }
});

export default RoombaModule;
