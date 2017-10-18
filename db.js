const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'us-cdbr-azure-northcentral-b.cloudapp.net',
//     user: 'bc4f8d934d644e',
//     password: '126d12a4',
//     database: 'jkoki'

// });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'shadowx',
    password: 'password@#13',
    database: 'nfc_ecommerce'

});


connection.connect();

var db = {
    'createProduct' : function (product) {
        return new Promise(function(resolve, reject){
            var sql = `insert into product values ('', '${product.name}','${product.description}', '${product.price}','${product.number}', '${product.path}')`;
            connection.query(sql, function(err,result){
                console.log("result: ",result);
                console.log("error: ", err);
                if(result.affectedRows > 0){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    },
    'getProduct' : function (id) {
        return new Promise(function(resolve, request){
            var sql = `select * from product where id='${id}'`;
            connection.query(sql, function(err, rows){
                var data = JSON.parse(JSON.stringify(rows));
                if (rows.length > 0) {
                    // var data = JSON.parse(JSON.stringify(rows));
                    resolve(data);
                }else if(rows.length == 0){
                    resolve(data);
                } else {
                    reject(err);
                }
    
            });
            
        });
    },
    'getProducts' : function () {
        return new Promise(function(resolve, request){
            var sql = `select * from product`;
            connection.query(sql, function(err, rows){
                var data = JSON.parse(JSON.stringify(rows));
                if (rows.length > 0) {
                    // var data = JSON.parse(JSON.stringify(rows));
                    resolve(data);
                }else if(rows.length == 0){
                    resolve(data);
                } else {
                    reject(err);
                }
    
            });
            
        });
    },
    'updateProduct' : function(id,field,value){
        return new Promise( function(resolve, reject){
            var sql = `update product set ${field}= '${value}' where id=${id}`;
            connection.query(sql, function(err, result){
                if(result.affectedRows > 0){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    }

};

module.exports = db;
