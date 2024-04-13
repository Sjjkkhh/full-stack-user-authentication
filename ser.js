var express= require ("express");
var mongoClient=require("mongodb").MongoClient;
var cors= require("cors");
var connectionSting= "mongodb://127.0.0.1:27017";
var app = express();
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/getusers",function(req , res){
    mongoClient.connect(connectionSting, function(err,clientObject){
        if(!err){
            var dbo= clientObject.db("ishopdb");
            dbo.collection("tblusers").find({}).toArray(function(err,documents){
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});
app.post("/registeruser",function(req , res){
    mongoClient.connect(connectionSting,function(err, clientObject){
        if(!err){
            var dbo= clientObject.db("ishopdb");
            var data={
               
                "UserName":req.body.UserName,
                "email":req.body.email,
                "UserId":req.body.UserId,
                "LastName":req.body.LastName,
                 "City":req.body.City,
                "Password":req.body.Password
            };
            dbo.collection("tblusers").insertOne(data,function(err,result){
                if(!err){
                    console.log("Record inserted");
                }
            })
        }
    })
});
app.listen(8080);
console.log("server started: http://localhost:8080");