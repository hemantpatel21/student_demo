const {MongoClient, Collection} = require('mongodb');
const url = 'mongodb://localhost:27017';
const databaseName = 'student';
const conn = new MongoClient(url);

async function dbConnect(){
    let result = await conn.connect();
    db=result.db(databaseName);
    return db.collection('stud_details');
}

module.exports = dbConnect;