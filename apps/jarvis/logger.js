module.exports = (request) => (message) => {
    const address = request.data.remoteAddress;
    const timestamp = request.data.request.timestamp;
    console.log(address, timestamp, message);
};
