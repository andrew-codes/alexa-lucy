import Promise from 'bluebird';
import {MongoClient} from 'mongodb';
import {dbHost, dbPort} from './../config';
const mongoAddress = dbHost;
const mongoPort = dbPort;
const connectionString = `mongodb://${mongoAddress}:${mongoPort}/lucy`;

const getWithOid = (type) => (item) => ({
    ...item,
    oid: `${type}:${item._id}`
});

export default () => new Promise((resolve, reject) => {
    MongoClient.connect(connectionString, function(error, db) {
        if (error) {
            reject(error);
            return;
        }
        resolve(db);
    });
});

export const getInsert = (type, db) => (data) =>
    new Promise((resolve, reject) => {
        const items = Array.isArray(data)
            ? data
            : [data];
        db.collection(type)
            .insertMany(items, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result.ops.map(getWithOid(type)));
            });
    });

export const getUpdate = (type, db) => (item) =>
    new Promise((resolve, reject) => {
        db.collection(type)
            .updateOne({oid: item.oid}, item, null, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result.ops);
            });
    });

export const getQuery = (type, db) => (query = {}) =>
    new Promise((resolve, reject) => {
        db.collection(type)
            .find(query)
            .toArray((error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.map(getWithOid(type)));
            });
    });
