const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('./db');


//api middleware
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use('/static', express.static('public'));
router.use(function(req, res, next){
    console.log('something s happening here');
    next();
});

//api routes
router.get('/products', function(req, res){
    var products = db.getProducts();
    
    products.then(function(data){
        var response = {
            status : "OK",
            data: data,
            message: "Product was retrieved successfully"
        };
        res.send(response);
        return;
    }, function(err){
        var response = {
            status : "ERROR",
            data: err,
            message: "Error while retrieving product"
        };
        res.send(response);
        return;

    })

});

router.get('/product/:id', function(req, res){
    var product = db.getProductById(req.params.id);

    product.then(function(data){
        var response = {
            status: "OK",
            data: data,
            message: "Your product has been retrieved successfully"
        };
        res.send(response);
        return;
    }, function(err){
        var response = {
            status: "ERROR",
            data: err,
            message: "Your product has not been retrieved successfully"
        };
        res.send(response);
        return;
    });
    
});

router.post('/product', function(req,res){
    console.log("req: ",req);
    var product = {
        name:req.body.name,
        description: req.body.description,
        price: req.body.price,
        number: req.body.number,
        path: req.body.path
    };
    var newProduct = db.createProduct(product);

    newProduct.then(function(result){
        var response = {
            status: "OK",
            data: result,
            message: "New product has been created successfully"
        };
        res.send(response);
        return;

    }, function(err){
        var response = {
            status: "ERROR",
            data: err,
            message: "New product was not created"
        };
        res.send(response);
        return;
    })
});

router.get('/product/:id/:field/:value', function(req,res){
    var updatedProd = db.updateProduct(req.params.id, req.params.field, req.params.value);
    updatedProd.then(function(data){
        var response = {
            status: "OK",
            message: "Product has been updated successfully"
        };
        res.send(response);
        return;
    }, function(err){
        var response = {
            status:"ERROR",
            message:"Couldn't update product"
        };
        res.send(response);
        return;
    })

});

router.get('/product/test/:name', function(req,res){
    var product = db.getProductByName(req.params.name);
    
    product.then(function(data){
        console.log(data)
        var response = {
            status: "OK",
            data: data,
            message: "Your product has been retrieved "
        };
        res.send(response);
        return;
    }, function(err){
        var response = {
            status: "ERROR",
            data: err,
            message: "Your product has not been retrieved successfully"
        };
        res.send(response);
        return;
    });

})



module.exports = router;