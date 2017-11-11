const jwt = require('jsonwebtoken');

var data = {
  id: 12
};

var token = jwt.sign(data, '123abc');
console.log(token);

var verify = jwt.verify(token, '123abc');
console.log(verify);
