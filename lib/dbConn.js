const { MongoClient } = require('mongodb');
const url = process.env.DB_STRING;

const dbName = process.env.DM_Users_DB_NAME

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let mongodb;
function connectToServer(callback){
  client.connect((err, db) => {
      if (err || !db) {
          return callback(err);
        }
        mongodb = db.db(dbName);
        console.log('connected successfully');

        return callback();
    });
}
function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connectToServer,
    get,
    close
};