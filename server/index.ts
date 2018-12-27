import express, { Request, Response, NextFunction } from 'express';
// import * as cors from 'cors'
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use( bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
let userCash = 400;

// mocking information in arrays
let users:any = [];
let products:any = [];

app.post('/register', (request, response) => {
  console.log("[debug] receiving on /register :", request.body);
  let data = request.body;
  let checkCreated = users.filter((x:any) => x.login == data.login);
  if(checkCreated.length == 0) users.push(data);
  if(users.indexOf(data) == -1) response.send("this user already exist.");
  let res = users[users.indexOf(data)];
  response.send(res);
});

app.get('/users', (request, response) => {
  console.log("[debug] receiving on /users :", request.body);
  response.send(users);
});

app.get('/login', (request, response) => {
  console.log("[debug] receiving on /login :", request.body);
  response.send({test: 'ok'});
});

app.get('/cash', (request, response) => {
    response.send({cash: userCash});
});

app.post('/payCash', (request, response) => {
    var amountPayed = request.body.amount;
    userCash -= amountPayed;
    // userCash = userCash - amountPayed
    response.send('got it');
});


app.listen(3000, '0.0.0.0', () => console.log('listening...'));
