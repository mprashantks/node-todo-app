const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
  if(error)
    return console.log('Unable to connect to MongoDB database: '+error);
  console.log('Connected to MongoDB database');

  db.collection('Users').findOneAndUpdate(
    {name: 'prashant'},
    {$set: {name: 'prashant kumar'}, $inc: {age:10}},
    {returnOriginal: false}
  ).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  db.close();
});
