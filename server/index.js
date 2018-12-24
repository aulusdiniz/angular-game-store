"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import * as cors from 'cors'
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express_1.default();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
var userCash = 400;

app.get('/login', (request, response) => {
  console.log("receiving on /login :", request);
  response.send({test: 'ok'});
});

app.get('/cash', function (request, response) {
    response.send({ cash: userCash });
});

app.post('/payCash', function (request, response) {
    var amountPayed = request.body.amount;
    userCash -= amountPayed;
    // userCash = userCash - amountPayed
    response.send('got it');
});
app.listen(3000, '0.0.0.0', function () { return console.log('listening...'); });
