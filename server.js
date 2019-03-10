const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users : [
    {
      id: '123',
      name: 'John',
      password: 'john',
      email: 'john@gmail.com',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      password: 'banana',
      email: 'sally@gmail.com',
      entries: 0,
      joined: new Date()
    }
  ],
  login : [
    {
      id: '987',
      hash: '',
      email: 'john@gmail.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  // Load hash from your password DB.
  // bcrypt.compare("banana_1234", '$2a$10$oDTjtk8IkPUhuJdn9z4SUOF1ziT6HfoSkBRjV0NBGjMyuYp8xggtG', function(err, res) {
  //     console.log('first guess', res);
  // });
  // bcrypt.compare("veggies", '$2a$10$oDTjtk8IkPUhuJdn9z4SUOF1ziT6HfoSkBRjV0NBGjMyuYp8xggtG', function(err, res) {
  //     console.log('second guess', res);
  // });
  if( req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password){
      res.json(database.users[0]);
  }else{
      res.status(400).json('error loging in');
    }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;


  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach( user => {
    if( user.id === id){
      found = true;
      return res.json(user);
    }
  })
  if(!found){
    res.status(400).json('not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = true;
  database.users.forEach( user => {
    if( user.id === id){
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if(!found){
    res.status(404).json('not found');
  }
})


app.listen(3000, () => {
  console.log("Running");
});
