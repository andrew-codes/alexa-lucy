export const save = (roombas) => {
    let count = 1;
    return Promise.resolve(
        roombas
            .map((roomba) => ({
                    oid: `Roomba:${count++}`,
                    clientOid: roomba.get('oid')
                })
            )
    )
        .then((roombas) => ({
                type: 'Roomba/ALL_SAVED_SUCCESS',
                payload: roombas
            })
        );
};
