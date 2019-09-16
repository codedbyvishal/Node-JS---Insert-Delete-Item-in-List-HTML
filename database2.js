const pg = require('pg');
const connectionString = "postgres://postgres:1234@localhost:5432/postgres";

const client = new pg.Client(connectionString);

client.connect(function(err,res){
    if(err){
        console.log('Connection to DataBase Failed',err);
    }
    else{
        console.log('Connection to Database Established');
    }
});

function insertuser(user){
    let insertQuery = `INSERT INTO code.table (name,email) VALUES('${user.name}','${user.email}')`;
    console.log('Insertion Query --->',insertQuery);
    client.query(insertQuery,function(err,res){
        if(err){
            console.log('Inserting into Database failed',err);
        }
        else{
            console.log(res.rows);
        }
    });
}

function listuser(fn){
    let selectQuery = `SELECT * FROM code.employee`;
    console.log('selectquery---->',selectQuery);
    client.query(selectQuery,function(err,res){
        if(err){
            fn({'error':'error'});
        }
        else{
            fn(res.rows);
        }
    });
}

function deleteuser(dl){
    let deleteQuery = `DELETE FROM code.employee WHERE name='${dl.name}'`;
    client.query(deleteQuery,function(err,res){
        if(err){
            console.log({'error':'error'});
        }
        else{
            console.log('Delete Query---->',res.rows);
        }
    });
}

module.exports = {insertuser:insertuser,listuser:listuser,deleteuser:deleteuser};