const logger = require('./../logger');

module.exports.name = 'AddRoomba';
module.exports.schema = {
    slots: {
        RoombaAddress: 'LITERAL'
    },
    utterances: [
        '{to |} {add|create} {-|a} {-|new} roomba {-|at|for} {-|RoombaAddress}',
    ]
};
module.exports.handler = (request, response) => {
    const log = logger(request);
    const address = request.slot('RoombaAddress');
    log(`Roomba Address: ${address}`);
};

