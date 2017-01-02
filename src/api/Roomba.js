import axios from 'axios';

export const save = (roombas) => {
    return axios.post('/__data/roomba', {roombas})
        .then(({roombas}) => ({
            type: 'Roomba/ALL_SAVED_SUCCESS',
            payload: roombas,
        }))
        .catch((error) => ({
            type: 'Roomba/ALL_SAVED_FAILURE',
            payload: {
                saved: [],
                failed: {
                    messages: [error],
                    oids: roombas.map(roomba => roomba.oid),
                }
            },
        }));
};
