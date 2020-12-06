conn = new Mongo('localhost:27017');
db = conn.getDB('youvote');
// Create categories collection
db.createCollection('categories');
db.categories.insert([
  { _id: 1, name: 'General' },
  { _id: 2, name: 'Política' },
  { _id: 3, name: 'Deportes' },
]);
// Create images collection
db.createCollection('images');
db.images.insert([
  { _id: 1, name: 'image1.jpg' },
  { _id: 2, name: 'image2.jpg' },
  { _id: 3, name: 'image3.jpg' },
]);
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
  name: 'Sí/No/NS-NC',
  answers: [1, 2, 3],
});
