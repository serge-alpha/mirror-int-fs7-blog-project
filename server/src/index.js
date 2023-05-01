// please change everything based on your need
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const createError= require('http-errors')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser');


const dev = require('./config');
const userRouter = require('./routes/user');
const connectDB = require('./config/db');
const blogRouter = require('./routes/blog');


const app = express();
const port = dev.app.serverPort;

app.use(morgan("dev"));
app.use(cors({
  origin:"*",
  credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('test');
});

app.use('/api/user',userRouter);

app.use('/api/blog',blogRouter);


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  connectDB();
});

app.use((req,res,next)=>{
  next(createError(404,'Route Not Found'));
})

app.use((err,req,res,next)=>{
  res.status(err.status||500).json({
    error:{
      status:err.status,
      ok:false,
      message:err.message,
    }
  })
})