const mysql = require('mysql');
//create a connection
const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'matricula'
});

mysqlConnection.connect(function (err){
    if (err){
        console.error(err);
        return;
    }
    else{
        console.log('database is connected')
    }
});

module.exports = mysqlConnection;