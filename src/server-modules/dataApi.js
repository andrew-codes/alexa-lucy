import bodyParser from 'body-parser';
import getDb, {getInsert, getQuery, getUpdate} from './../data-service/Db';

export default (express) => {
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({extended: true}));
    express.get('/__data/roomba', (req, resp) => {
        getDb()
            .then((db) => {
                const results = getQuery('Roomba', db)(req.body || {});
                resp.status(200).send(results);
                db.close();
            })
    });
    express.post('/__data/roomba', (req, resp) => {
        getDb()
            .then((db) => {
                const insert = getInsert('Roomba', db);
                const items = req.body;
                insert(items)
                    .then((results) => resp.status(200).send({results}));
                db.close();
            });
    });
    express.put('/__data/roomba', (req, resp) => {
        getDb()
            .then((db) => {
                const update = getUpdate('Roomba', db);
                const items = req.body;
                items.map(update)
                    .then((results) => resp.status(200).send({results}));
                db.close();
            });
    });
};
