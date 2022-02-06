const { INDEXES } = { USERS: 'MobiParkUsers', Tickets: 'MobiParkTickets' };
const makeDb = require('./dbConn');

module.exports = function makeProjectsDb() {
  return Object.freeze({
    findAll,
    findById,
    findByName,
    insert
  })


  async function findAll({ activeOnly = true } = {}) {
    const db = await makeDb();
    const query = activeOnly ? { isDeleted: false } : {}
    const result = await db.collection(INDEXES.Tickets).find(query)
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found
    }))
  }

  async function findById({ id: _id }) {
    const db = await makeDb();
    const result = await db.collection(INDEXES.Tickets).find({ _id })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { _id: id, ...info } = found[0]
    return { id, ...info }
  }

  async function findByEmail({ emailId }) {
    const db = await makeDb();
    const result = await db.collection(INDEXES.USERS).find({ emailId })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { name, ...info } = found[0]
    return { name, ...info }
  }

  async function insert ({ projectInfo }) {
    const db = await makeDb();
    const result = await db
      .collection(INDEXES.Tickets)
      .insertOne({ projectInfo });
    const { insertedInfo } = result.ops[0];
    return { insertedInfo }
  }

}