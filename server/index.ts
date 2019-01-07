import express, { Request, Response, NextFunction } from 'express';
// import * as cors from 'cors'
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use( bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

  let userSample = {
    login: 'Ralph Warren',
    password: '123456',
    cash: 0,
    orders: [{
      id: 1,
      price: 35,
      name: "Rouge Allure",
      image: "/../../assets//pictures/lipsticks_chanel/lipstick1.png",
      shippingStatus: "sent to receiver",
      address: "some where in the world"
    }]
  }

  let userCash = 500;
  let users: Array<any> = [{ login: 'user', password: '123', cash: 500, orders: [], payments: []}];
  let productList: Array<any> =[
    {name: "Rouge Allure", price: 35, quantity: 10, id: 1, category: ["Lipstick", "Our Best Sellers"], image: "/../../assets//pictures/lipsticks_chanel/lipstick1.png"},
    {name: "Rouge COCO Stylo", price: 30, quantity: 10, id: 2, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick2.png"},
    {name: "Rouge Allure Ink", price: 36, quantity: 10, id: 3, category: ["Lipstick"], image: "/../../assets//pictures/lipsticks_chanel/lipstick3.png"},
    {name: "Foundation Matte", price: 11.99, id: 4, quantity: 10, category: ["Foundation","Our Best Sellers"], image:"../../../assets//pictures/foundation_Maybyline/foundation1.png"},
    {name: "Foundation SuperStay", price: 11.99, quantity: 10, id: 5, category: ["Foundation"],  image:"../../../assets//pictures/foundation_Maybyline/foundation2.png"},
    {name: "Foundation Satin Liquid", price: 11.99, quantity: 10, id: 6, category: ["Foundation"], image:"../../../assets//pictures/foundation_Maybyline/foundation3.png"},
    {name: "Eyebrow Brow Zings", price: 34.95, quantity: 10, id: 7, category: ["Eyebrow","Our Best Sellers"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow1.png"},
    {name: "Eyebrow Powder", price: 34.95, quantity: 10, id: 8, category: ["Eyebrow"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow2.png"},
    {name: "Eyebrow Pen", price: 34.95, quantity: 10, id: 9, category: ["Eyebrow"], image:"../../../assets//pictures/eyebrows_benefit/eyebrow3.png"},
    {name: "Mascara Bang", price: 24.99, quantity: 10, id: 10, category: ["Mascara","Our Best Sellers"], image:"../../../assets//pictures/mascara_benefit/mascara1.png"},
    {name: "Mascara Roller", price: 24.99, quantity: 10, id: 11, category: ["Mascara"], image:"../../../assets//pictures/mascara_benefit/mascara2.png"},
    {name: "Mascara Lash", price: 24.99, quantity: 10, id: 12, category: ["Mascara"], image:"../../../assets//pictures/mascara_benefit/mascara3.png"},
    {name: "Warm palette", price: 55, quantity: 10, id: 13, category: ["Eyeshadow","Our Best Sellers"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow1.png"},
    {name: "Spring palette", price: 55, quantity: 10, id: 14, category: ["Eyeshadow"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow2.png"},
    {name: "Brown palette", price: 55, quantity: 10, id: 15, category: ["Eyeshadow"], image:"../../../assets//pictures/eyeshadow_anastaasia/eyeshadow3.png"},
    {name: "Liner Plume", price: 19.99, quantity: 10, id: 16, category: ["Eyeliner","Our Best Sellers"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner1.png"},
    {name: "Eyeliner", price: 19.99, quantity: 10, id: 17, category: ["Eyeliner"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner2.png"},
    {name: "Eye Crayon", price: 19.99, quantity: 10, id: 18, category: ["Eyeliner"], image:"../../../assets//pictures/eyeliner_lancome/eyeliner3.png"},
  ];

  //register regular users login & passwd
  app.post('/register', (request, response) => {
    console.log("[debug] receiving on /register :", request.body);
    let data = request.body;
    let checkCreated = users.filter((x:any) => x.login == data.login);
    if(checkCreated.length == 0) users.push({
      login: data.login,
      password: data.password,
      cash: 0,
      orders: [],
      payments: []
    }); //keeps admin injections via post away
    else {
      response.send({ status: "this user already exist" });
      return;
    }
    response.send({ status: "user created now" });
  });

  //verify if the sent login & passwd is in data structure 'users'
  app.post('/login', (request, response) => {
    console.log("[debug] receiving on /login :", request.body);
    let data = request.body;
    let userFound = users.filter((x:any) => x.login == data.login)[0] || undefined;
    if(userFound != undefined && userFound.password == data.password) response.send({ status: 'authorized' });
    else response.send({ status: 'unauthorized' });
  });

  //list all users
  app.get('/users', (request, response) => {
    console.log("[debug] receiving [GET] on /users :", request.body);
    const result = users.map((usr: any) => usr.login);
    response.send(result);
  });

  // TODO: adapt Router for manage better params
  app.get('/users/:id', (request, response) => {
    console.log("[debug] receiving [GET] on /users/:id :", request.params.id);
    let user = request.params.id;
    let index = users.map((usr: any) => usr.login).indexOf(user);
    if(index < 0){
      response.send({ status: 'fail' });
      return;
    }
    console.log(users[index]);
    response.send(users[index]);
  });

  app.get('/items', (request, response) => {
    console.log("[debug] receiving  [GET] on /items :", request.body);
    response.send(productList);
  });

  app.post('/purchase', (request, response) => {
    console.log("[debug] receiving  [POST] on /purchase :", request.body);
    let totalBill = 0;
    let order = request.body;

    order.products.forEach((product: any) => {
      totalBill += product.price;
      productList.forEach(stockProduct => {
        if (stockProduct.id === product.id && stockProduct.quantity > 0) {
          stockProduct.quantity -= 1;
        } else if( stockProduct.id === product.id && stockProduct.quantity < 1){
          response.send({ status: 'fail' })
          return;
        }
      });
    });

    // get user index for update data (little trick)
    let index = users.map((usr: any) => usr.login).indexOf(order.user);

    if( users[index].cash < totalBill ){
      response.send({ status: 'fail' })
      return;
    }

    users[index].cash -= totalBill;
    users[index].orders.push(order.products);
    users[index].payments.push(order.form);
    users[index].orders = [].concat.apply([], users[index].orders); //flat array
    console.log(users[index]);
    response.send({ status: 'success'});
  });

  app.get('/cash', (request, response) => {
    console.log("[debug] receiving  [GET] on /cash :", request.body);
    response.send({cash: userCash});
  });

  //increase amount
  app.post('/increaseCash', (request, response) => {
  console.log("[debug] receiving  [POST] on /increaseCash :", request.body);
    let amountIncreased = request.body.increased;
    userCash += amountIncreased;
    response.send({ userCash: userCash });
  });
  //end of increase amount

  app.listen(3000, '0.0.0.0', () => console.log('Listening on (0.0.0.0:3000)'));
