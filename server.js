const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const app = express();

const {getElementById,createElement,updateElement,deleteElement} = require('./controller/controller');

let data = require('./data.json');

app.use(express.urlencoded({extended:true}));
app.use(express.json())

// get all data

app.get('/product',(req,res) =>{
  res.send(data);
});

//  get element by ID

app.get('/product/:Id',(req,res) =>{
getElementById(req,res);
});
// post (create elemant in data)

app.post('/product', (req, res) => {
  createElement(req,res);
})

// updated product 

app.put('/product/:Id', (req,res,next) =>{
 updateElement(req,res);
})

// deleted products

app.delete('/product/:Id', (req,res) =>{
 deleteElement(req,res);
})


app.listen(8080, () =>{console.log('Server is running ...')})
