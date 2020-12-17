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
// Create genders collection
db.createCollection('genders');
db.genders.insert([
  { _id: 1, name: 'Femenino' },
  { _id: 2, name: 'Masculino' },
  { _id: 3, name: 'No binario' },
]);
// Create countries collection
db.createCollection('countries');
db.countries.insert([{ _id: 1, name: 'España' }]);
// Create regions collection
db.createCollection('regions');
db.regions.insert([
  { _id: 1, country: 1, name: 'Andalucía' },
  { _id: 2, country: 1, name: 'Aragón' },
  { _id: 3, country: 1, name: 'Principado de Asturias' },
  { _id: 4, country: 1, name: 'Illes Balears' },
  { _id: 5, country: 1, name: 'Canarias' },
  { _id: 6, country: 1, name: 'Cantabria' },
  { _id: 7, country: 1, name: 'Castilla y León' },
  { _id: 8, country: 1, name: 'Castilla-La Mancha' },
  { _id: 9, country: 1, name: 'Cataluña' },
  { _id: 10, country: 1, name: 'Comunitat Valenciana' },
  { _id: 11, country: 1, name: 'Extremadura' },
  { _id: 12, country: 1, name: 'Galicia' },
  { _id: 13, country: 1, name: 'Comunidad de Madrid' },
  { _id: 14, country: 1, name: 'Región de Murcia' },
  { _id: 15, country: 1, name: 'Comunidad Foral de Navarra' },
  { _id: 16, country: 1, name: 'País Vasco' },
  { _id: 17, country: 1, name: 'La Rioja' },
  { _id: 18, country: 1, name: 'Ciudad Autónoma de Ceuta' },
  { _id: 19, country: 1, name: 'Ciudad Autónoma de Melilla' },
]);
