import express, { Request, Response, NextFunction } from 'express';
// import * as cors from 'cors'
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use( bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true})); 

let userCash = 400;

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