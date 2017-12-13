export default (db) => {
  const collection = db.collection('solutions')
  return {
    async all() {
      return collection.find({}).toArray()
    }
  }
}
