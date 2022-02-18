const express = require('express') ; 
const app = express() ; 

//settings 

app.set('port', process.env.PORT || 5000) ; 

// Middlewares 

app.use(express.json());
 
//Routes 
app.get('/', function(req, res){
    res.json({
        'status': true,
        'content' : ' Bienvenidp a mi API'
    })
})

app.listen(app.get('port'),()=>{
    console.log(`Server running at http://localhost:${app.get('port')}`);
})

const mysqlConnection = require("./database") ; 

app.get('/alumno', function(req,res){
    mysqlConnection.query('select * from tbl_alumno', (err,rows,fields)=>{
        if (!err){
            res.json(rows); 
        }else {
            console.log(err); 
        }
    })
})


app.post('/alumno', function(req,res){
    const {alumno_nombre,alumno_email} = req.body; 
    const query = 'insert into tbl_alumno(alumno_nombre,alumno_email) values(?,?)'; 
    mysqlConnection.query(query, [alumno_nombre,alumno_email],(err,rows,fields)=>{
        if (!err){
            res.json({
                'status':true,
                'content':'alumno ingresado'
            }); 
        }else {
            console.log(err); 
        }
    })
})

app.put('/alumno/:id', function(req,res){
    const {alumno_nombre,alumno_email} = req.body;
    const {id} = req.params; 
    const query = 'update tbl_alumno set alumno_nombre=?, alumno_email=? where id=?'
    mysqlConnection.query(query,[alumno_nombre,alumno_email,id],(err,rows,fields)=>{
        if(!err){
            res.json({
                'status':true,
                'content':'alumno actualizado'
            })
        }else{
            console.log(err); 
        }
    })
})
