import webUI from './webUI';
import dataApi from './dataApi';

export default (express) => {
    webUI(express);
    dataApi(express);
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

