const { MongoClient } = require('mongodb');

const url = process.env.DB_STRING;
const dbName = process.env.DM_Users_DB_NAME
const client = new MongoClient(url, { useNewUrlParser: true });

async function makeDb () {
  if (!client.isConnected()) {
    await client.connect();
    console.log(`db connected 🚀`)
  }
  return client.db(dbName);
}


module.exports = makeDb;