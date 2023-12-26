const express = require('express');
const router =require('./src/Routes/api');
const app = new express();

const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const hpp =require('hpp');
const cors =require('cors');
const cookieParser = require('cookie-parser');
const mongoose =require('mongoose');
const path = require("path");
const bodyParser = require('body-parser')



//Database Connection......

// let URL="mongodb+srv://<username>:<password>@cluster0.derptwk.mongodb.net/E-COMMERS";
// mongoose.connect(URL)
// .then(success => console.log("server is connected"))
// .catch(err => console.log(err).toString)
//
let URL="mongodb+srv://<username>:<password>@cluster0.derptwk.mongodb.net/E-COMMERS";
let option={user:'user8552',pass:"user8552",autoIndex:true};
mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

//Use 
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(bodyParser.json())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true}));

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


app.get("/",(req,res)=>{
res.send("Hello this is Create page");
})


app.use("/api/v1",router)


// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'Client','dist','index.html'))
})

module.exports=app;