let data = require('../data.json'); 

 async  function product(){
    const  promise = Promise((resolve,reject) =>{
        resolve(data);
    })
     return promise;
}


exports.module = {
    product
}