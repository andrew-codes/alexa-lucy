const logger = require('./../logger');

module.exports.name = 'Clean';
module.exports.schema = {
    slots: {
        Location: 'LOCATION_TYPE'
    },
    utterances: [
        '{to |} {clean|vacuum} {the|my |} {-|Location}',
    ]
};
module.exports.handler = (request, response) => {
    const log = logger(request);
    const location = request.slot('Location');
    log(`Location: ${location}`);
};
