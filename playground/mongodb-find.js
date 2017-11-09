const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error)
    return console.log('Unable to connect to MongoDB database: '+error);
  console.log('Connected to MongoDB database');

  db.collection('Users').find({name: 'prashant'}).count().then((count) => {
    console.log(`Users with name prashant: ${count}`);
  });

  db.close();
});
