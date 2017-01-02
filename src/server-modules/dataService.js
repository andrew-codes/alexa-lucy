import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb';
const url = 'mongodb://localhost:27017/lucy';

const insert = (db) => (items) => new Promise((resolve, reject) => {
    db.collection('roombas').insertMany(items, (error, result) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(result.ops.map((op) => ({
            ...op,
            oid: `Roomba:${op._id}`
        })));
    });
});

const update = (db) => (item) => new Promise((resolve, reject) => {
    db.collection('roombas').updateOne({oid: item.oid}, item, null, (error, result) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(result.ops);
    });
});

export const getAll = () => new Promise((resolve, reject) => MongoClient.connect(url, function(error, db) {
    if (error) {
        reject(error);
        return;
    }
    const collection = db.collection('roombas')
        .find({})
        .toArray((err, roombas) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(roombas.map((roomba) => ({
                    ...roomba,
                    oid: `Roomba:${roomba._id}`
                })
            ));
        });
}));

export default (express) => {
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({extended: true}));
    express.get('/__data/roomba', (req, resp) => {
        getAll()
            .then((results) => resp
                .status(200)
                .send(results));
    });
    express.post('/__data/roomba', (req, resp, next) => {
        MongoClient.connect(url, function(error, db) {
            console.log(error);
            if (error) {
                return next(error);
            }
            console.log("Connected correctly to server");
            const insertItems = insert(db);
            const updateItem = update(db);

            const roombas = req.body.roombas;
            const newRoombas = roombas.filter((roomba) => roomba.isNew);
            const updateRoombas = roombas.filter((roomba) => !roomba.isNew);
            Promise.all([
                insertItems(newRoombas),
                ...updateRoombas.map(updateItem)
            ])
                .then((...ops) => {
                    const operations = ops.reduce((output, op) => output.concat(op), []);
                    resp.status(200).send({roombas: operations});
                });
            db.close();
        });
    });
};
