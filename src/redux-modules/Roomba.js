import {arrayOf, shape, string} from 'react/PropTypes';
import {Effects, liftState, loop} from 'redux-loop';
import {List, Map} from 'immutable';
import {createModule} from 'redux-modules';
import roombaApi from './../api/Roomba';

// Module name
// ---------------------------------
const name = 'Roomba';

// Default state
// ---------------------------------
const defaultState = {
    errors: new List(),
    roombas: new Map(),
    saving: new Map()
};

// Update a single roomba
// ---------------------------------
const update = {
    payloadTypes: {
        oid: string.isRequired
    },
    reducer: (state, {payload}) => ({
        ...state,
        members: state.members.mergeDeep({
            [payload.oid]: {
                ...payload,
                saved: false
            }
        })
    })
};

// Persist any unsaved roombas
// ---------------------------------
const save = {
    reducer: (state, {payload}) => loop(
        state,
        Effects.promise(roombaApi.save, state.roombas.filter((roomba) => !roomba.saved).toArray())
            .then(RoombaModule.actions.allSavedSuccess)
            .catch(RoombaModule.actions.allSavedFailure)
    )
};

// Action when all attempted saved members were successful.
const allSavedSuccess = {
    payloadTypes: arrayOf(string),
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

// Action handling a single member save.
const saveSuccess = {
    payloadTypes: {
        oid: string
    },
    reducer: (state, {payload}) => ({
        ...state,
        members: state.members.mergeDeep({
            [payload.oid]: {
                saved: true
            }
        })
    })
};

// Action when only some were successful. Payload has successful oid array, and failure array with oid: error message key value pair.
const allSavedFailure = {
    payloadTypes: {
        saved: arrayOf(string),
        failed: arrayOf(shape({
            oid: string,
            error: string
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
        init: state => state,
        save,
        update,
        allSavedSuccess,
        saveSuccess,
        allSavedFailure
    }
});

export default RoombaModule;
