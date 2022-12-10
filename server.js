var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection; 

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extends: false}));
app.use(cors())

//mongoDb connection...
const MongoClient = require('mongodb').MongoClient; 
const uri = mongodb//Manasa:Manasadolly@cluster0.7keuks3.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://abatool:amna@cluster0.xnvxmni.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useNewUrlParser: true})


const createCollection = (collectionName) => {
    client.connect((err,db) => {
        projectCollection = client.db().collection(collectionName);
        if(!err){
            console.log('MongoDb Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

//insert project....
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

//post api....
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newProject = req.body;
    insertProjects(newProject,(err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Project Successfully added", data: result})
        }
    })
})

// const addNumbers = (number1, number2) => {
//     var num1 = parseInt(number1)
//     var num2 = parseInt(number2)
//     var result = num1+num2;
//     return result; 
// }

// app.get("/addTwoNumbers", (req,res) => {
//     var number1 = req.query.number1;
//     var number2 = req.query.number2;
//     var result = addNumbers(number1, number2)
//     res.json({statusCode: 200, data: result, message:'Success'})
// })

// get project...
const getProjects = (callback) => {
    projectCollection.find({}).toArray(callback);
}

app.get('/api/projects',(req,res) => {
    getProjects((err,result) => {
        if(err) {
            res.json({statusCode: 400, message: err})
        }
        else {
            res.json({statusCode: 200, message:"Success", data: result})
        }
    })
})

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to http://localhost:"+port)
    createCollection('pets')
})