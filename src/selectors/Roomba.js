import {createSelector} from 'reselect';

const nullRoomba = {
    oid: 'Roomba:NULL',
    name: '',
    address: '',
    spaces: []
};

const getModuleState = (state) => state.Roomba;
const getImmutableRoombas = createSelector([getModuleState], (moduleState) => moduleState.roombas);
export const getRoombas = createSelector([getImmutableRoombas], (roombas) => roombas.toList().toJS());

const getSelectedOid = createSelector([getModuleState], (moduleState) => moduleState.selectedRoomba);
export const getSelectedRoomba = createSelector([getImmutableRoombas, getSelectedOid], (roombas, oid) => {
    const selected = roombas.get(oid);
    if (!selected) {
        return nullRoomba;
    }
    return selected.toJS()
});
