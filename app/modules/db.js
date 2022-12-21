const mongojs = require('mongojs');

const database = 'footballdata';
const collection = 'players';

const db = mongojs(`mongodb://127.0.0.1:27017/${database}`, [collection]);

const getPlayerById = (id) => {
    return new Promise((resolve, reject) => {
        db[collection].findOne({id}, (err, doc) => {
            if(err) reject(err);
            else resolve(doc);
        });
    });
}

const removePlayer = (id) => {
    db[collection].remove({id});
}

const insertPlayer = (params) => {
    db[collection].insertOne(params);
}

const modifyPlayer = (params) => {
    return new Promise((resolve, reject) => {
        db[collection].findAndModify({
            query: {id: params.id},
            update: {
                id: params.id,
                name: params.name,
                birthdate: params.birthdate,
                nationality: params.nationality,
                teamId: params.teamId,
                position: params.position,
                number: params.number
            }
        }, (err, docs) => {
            if(err) reject(err);
            else resolve(docs)
        });
    })
}


const DB = {
    getPlayerById,
    removePlayer,
    insertPlayer,
    modifyPlayer,
}

module.exports = DB;
