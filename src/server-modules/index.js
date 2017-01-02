import webUI from './webUI';
import dataService from './dataService';

export default (express) => {
    webUI(express);
    dataService(express);
    express.use((err, req, res, next) => {
        console.error(err.stack);
        next(err)
    });
    express.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err);
        }
        res.status(500);
        res.send({ error: err });
    });
};

