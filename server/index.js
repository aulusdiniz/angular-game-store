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
var userCash = 500;
var users = [];
var productList = [
    { name: "Rouge Allure", price: 35, quantity: 10, id: 1, category: ["Lipstick", "Our Best Sellers"], image: "/../../assets//pictures/lipsticks_chanel/lipstick1.png" },
    { name: "Rouge COCO Stylo", price: 30, quantity: 10, id: 2, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick2.png" },
    { name: "Rouge Allure Ink", price: 36, quantity: 10, id: 3, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick3.png" },
    { name: "Foundation Matte", price: 11.99, id: 4, quantity: 10, category: ["Foundation", "Our Best Sellers"], image: "../../../assets//pictures/foundation_Maybyline/foundation1.png" },
    { name: "Foundation SuperStay", price: 11.99, quantity: 10, id: 5, category: ["Foundation"], image: "../../../assets//pictures/foundation_Maybyline/foundation2.png" },
    { name: "Foundation Satin Liquid", price: 11.99, quantity: 10, id: 6, category: ["Foundation"], image: "../../../assets//pictures/foundation_Maybyline/foundation3.png" },
    { name: "Eyebrow Brow Zings", price: 34.95, quantity: 10, id: 7, category: ["Eyebrow", "Our Best Sellers"], image: "../../../assets//pictures/eyebrows_benefit/eyebrow1.png" },
    { name: "Eyebrow Powder", price: 34.95, quantity: 10, id: 8, category: ["Eyebrow"], image: "../../../assets//pictures/eyebrows_benefit/eyebrow2.png" },
    { name: "Eyebrow Pen", price: 34.95, quantity: 10, id: 9, category: ["Eyebrow"], image: "../../../assets//pictures/eyebrows_benefit/eyebrow3.png" },
    { name: "Mascara Bang", price: 24.99, quantity: 10, id: 10, category: ["Mascara", "Our Best Sellers"], image: "../../../assets//pictures/mascara_benefit/mascara1.png" },
    { name: "Mascara Roller", price: 24.99, quantity: 10, id: 11, category: ["Mascara"], image: "../../../assets//pictures/mascara_benefit/mascara2.png" },
    { name: "Mascara Lash", price: 24.99, quantity: 10, id: 12, category: ["Mascara"], image: "../../../assets//pictures/mascara_benefit/mascara3.png" },
    { name: "Warm palette", price: 55, quantity: 10, id: 13, category: ["Eyeshadow", "Our Best Sellers"], image: "../../../assets//pictures/eyeshadow_anastaasia/eyeshadow1.png" },
    { name: "Spring palette", price: 55, quantity: 10, id: 14, category: ["Eyeshadow"], image: "../../../assets//pictures/eyeshadow_anastaasia/eyeshadow2.png" },
    { name: "Brown palette", price: 55, quantity: 10, id: 15, category: ["Eyeshadow"], image: "../../../assets//pictures/eyeshadow_anastaasia/eyeshadow3.png" },
    { name: "Liner Plume", price: 19.99, quantity: 10, id: 16, category: ["Eyeliner", "Our Best Sellers"], image: "../../../assets//pictures/eyeliner_lancome/eyeliner1.png" },
    { name: "Eyeliner", price: 19.99, quantity: 10, id: 17, category: ["Eyeliner"], image: "../../../assets//pictures/eyeliner_lancome/eyeliner2.png" },
    { name: "Eye Crayon", price: 19.99, quantity: 10, id: 18, category: ["Eyeliner"], image: "../../../assets//pictures/eyeliner_lancome/eyeliner3.png" },
];
app.get('/items', function (request, response) {
    response.send(productList);
});
app.post('/items', function (request, response) {
    console.log(request.body.id === productList[9].id);
    productList.forEach(function (product) {
        if (product.id === request.body.id) {
            product.quantity = request.body.quantity;
        }
    });
    response.send('Ok');
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
//increase amount
app.post('/increaseCash', function (request, response) {
    var amountIncreased = request.body.increased;
    userCash += amountIncreased;
    response.send('got it');
});
//end of increase amount
//register regular users login & passwd
app.post('/register', function (request, response) {
    console.log("[debug] receiving on /register :", request.body);
    var data = request.body;
    var checkCreated = users.filter(function (x) { return x.login == data.login; });
    if (checkCreated.length == 0)
        users.push({ login: data.login, password: data.password }); //keeps admin injections via post away
    else
        response.send({ status: "this user already exist" });
    response.send({ status: "user created now" });
});
//verify if the sent login & passwd is in data structure 'users'
app.post('/login', function (request, response) {
    console.log("[debug] receiving on /login :", request.body);
    var data = request.body;
    var userFound = users.filter(function (x) { return x.login == data.login; })[0] || undefined;
    if (userFound != undefined && userFound.password == data.password)
        response.send({ status: 'authorized' });
    else
        response.send({ status: 'unauthorized' });
});
//list all users
app.get('/users', function (request, response) {
    console.log("[debug] receiving on /users :", request.body);
    response.send(users);
});
app.listen(3000, '0.0.0.0', function () { return console.log('Listening on (0.0.0.0:3000)'); });
