const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'us-cdbr-azure-southcentral-f.cloudapp.net',
    user: 'ba2bfc3e654d26',
    password: '64d48eec',
    database: 'nfcecommercedb'

});

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'shadowx',
//     password: 'password@#13',
//     database: 'nfc_ecommerce'

// });


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}
);

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
    'getProductById' : function (id) {
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
    'getProductByName' : function (name) {
        console.log('called')
        return new Promise(function(resolve, request){
            var sql = `select * from product where name='${name}'`;
            connection.query(sql, function(err, rows){
                var data = JSON.parse(JSON.stringify(rows));
                console.log("Data: ",data);
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
