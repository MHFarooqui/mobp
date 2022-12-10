const INDEXES = { USERS: 'USERS', Tickets: 'TICKETS' };
const ObjectID = require('mongodb').ObjectID;
const db = require('./dbConn');


async function findByEmail({ emailId }) {
  const result = await db.get().collection(INDEXES.USERS).find({ emailId })
  const found = await result.toArray()
  if (found.length === 0) {
    return null
  }
  const { name, ...info } = found[0]
  return { name, ...info }
}

async function exitTicket(TicketInfo) {
  const _id = TicketInfo._id;
  delete TicketInfo._id;
  TicketInfo.isActive = false;
  const newValue = { $set: TicketInfo};
  const result = await db.get().collection(INDEXES.Tickets).updateOne( { _id: new ObjectID(_id) }, newValue);
  if (result.modifiedCount) {
    return null
  }
  return { _id, ...newValue.$set }
}

async function saveTicket(tiketInfo) {
  const result = await db.get()
    .collection(INDEXES.Tickets)
    .insertOne({ ...tiketInfo, isActive: true, issuedOn: new Date().toLocaleString().replace(',','') });
  const insertedInfo = result.ops[0];
  return insertedInfo
}

module.exports = Object.freeze({
  findByEmail,
  saveTicket,
  exitTicket
});