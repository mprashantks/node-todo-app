const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/Todo');
const {User} = require('./models/User');

var app = express();
app.use(bodyParser.json());

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

app.get('/todo', (req, res) => {
  Todo.find().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

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

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});