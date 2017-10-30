const app = require('express')();
const api = require('./api');


app.use('/api', api);

var port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log("app is running to port ", port);
})