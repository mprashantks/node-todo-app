const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error)
    return console.log('Unable to connect to MongoDB database: '+error);
  console.log('Connected to MongoDB database');
  //
  // db.collection('Todo').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, response) => {
  //   if(error)
  //     return console.log('Coundn\'t insert document');
  //   console.log(JSON.stringify(response.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Prashant',
    age: 20,
    location: 'Pune'
  }, (error, response) => {
    if(error)
      return console.log('Could\'t insert');
    console.log(JSON.stringify(response.ops, undefined, 2));
  });

  db.close();
});
