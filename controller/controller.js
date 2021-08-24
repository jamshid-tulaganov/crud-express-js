const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const app = express();
let data = require('../data.json');

app.use(express.urlencoded({extended:true}));
app.use(express.json())

async function getElementById(req,res){
       try{
           let {Id} = req.params;
           let getProductById = data.find((elem)=>{
               return elem.id == Id;
           })

           if(getProductById){
               res.send(getProductById);
           } else {
               res.send('Not found 000')
           }

       } catch(error){
           console.log(error);
           res.status(404).send({
               message:'erroor'
           })
           res.end();
       }
}

// post request

function writeFile(req,res){
    fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8', (err) => {
        if (err) {
            res.send({
                message: 'Error in creation'
            })
            res.end()
        } else {
            res.status(200).send({
                message: 'Product has been created'
            })
            res.end()
        }
    })
}

function createElement(req,res){
        const {name, description, price} = req.body;

        const newProduct = {
            id: uuid.v4(),
            name, // name: name
            description, // description: description
            price // price: price
        }

        data.push(newProduct);
        writeFile(req,res);

}
// update data element

function updateElement(req,res){
    const {Id} = req.params;
    const {name,description,price} = req.body;

    let product = data.find((elem) =>{
        return elem.id === Id
    });

    if(!product){
        res.send({
            message:'Xatolik not found'
        })
    } else {
        let newProduct = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price
        }
        product = {
            id: product.id,
            ...newProduct
        }
        let index = data.findIndex((elem) => {
            return elem.id === Id
        })
        data[index] = product;
        fs.writeFile('./data.json', JSON.stringify(data,null,2),'utf-8',(err) => {
            if (err) {
                res.send({
                    message: 'Not updated'
                })
                res.end();
            } else {
                res.send({
                    message: 'Updated'
                })
                res.end();
            }
        })
    }
}
//delete element
function deleteElement(req,res){
    let {Id} = req.params;
    let newProducts = data.filter((elem) =>{
        return elem.id  !== Id
    })

    fs.writeFile('./data.json', JSON.stringify(newProducts,null,2),'utf-8',(err) =>{
        if(err){
            res.send({
                message:'Not deleted'
            })
            res.end();
        } else{
            res.send({
                message:'Deleted'
            })
            res.end();
        }
    })
}

module.exports = {
    getElementById,
    createElement,
    updateElement,
    deleteElement
}