var Express = require("express");
var Mongoclient=require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="mongodb+srv://admin:admin123@cluster0.a0fylhb.mongodb.net/?retryWrites=true&w=majority";

var DATABASENAME="bookdb";
var database;

app.listen(5038,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("Mongodb connected");
    })
})

app.get('/api/book-seller/GetNotes',(request,response)=>{
    database.collection("Bookcollection").find({}).toArray((error,result)=>{
        response.send(result);
    });
})

app.post('/api/book-seller/AddNotes',multer().none(),(request,response)=>{
    database.collection("Bookcollection").count({},function(error,numOfDocs){
        database.collection("Bookcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        }); 
        response.json("Added Succesfully");
    })
})

app.delete('/api/book-seller/DeleteNotes',(request,response)=>{
    database.collection("Bookcollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete Succesfully");
})
