const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

//Handle for inserting documents in database
app.post('/todo', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});


//Handle for listing all documents from database
app.get('/todo', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});


//Handle to list a document by id
app.get('/todo/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Not a valid ID');
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Todo not found');
    }
    res.send({todo});
  }, (err) => {
    res.status(400).send(err);
  });
});


//Handle to remove a document by id
app.delete('/todo/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send('ID not valid');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send('Todo not found');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
