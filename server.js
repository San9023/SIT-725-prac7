var express = require("express")
var app = express()
var cors = require('cors')
let projectCollection;
let dbConnect = require("./dbConnect");
let projectRoutes = require("./routes/projectRoutes")
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use('/api/projects',projectRoutes)


io.on('connection', (socket)=> {
    console.log('a user is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*5));
    }, 1000);
});

//Mongodb connection ...
// const MongoClient = require('mongodb').MongoClient;


// const client = new MongoClient(uri, {useNewUrlParser: true})

// const createColllection = (collectionName) => { 
//      client.connect((err,db) => { 
//      projectCollection = client.db().collection(collectionName); 
//         if(!err) { 
//              console.log('MongoDB Connected') 
//          } 
//          else { 
//              console.log("DB Error: ", err); 
//              process.exit(1); 
//          } 
//      }) 
// }
// insert project....

// 

var port = process.env.port || 3000;
http.listen(port,() => {
    console.log("App listening to: http://localhost:"+port)
    //createColllection('Pets')
})