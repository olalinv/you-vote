conn = new Mongo('localhost:27017');
db = conn.getDB('youvote');
// Create answers collection
db.createCollection('answers');
db.answers.insert([
  { _id: 1, name: 'Sí' },
  { _id: 2, name: 'No' },
  { _id: 3, name: 'NS/NC' },
]);
// Create surveyTypes collection
db.createCollection('surveytypes');
db.surveytypes.insert({
  _id: 1,
  name: 'Tipo 1',
  answers: [1, 2, 3],
});
