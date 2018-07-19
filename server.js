const express = require('express');
const app = express();
var port =process.env.PORT ||5431 ;
const bcrypt=require('bcrypt-nodejs');
const  bodyParser = require('body-parser');
var cors = require('cors');
const knex =require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const image=require('./controllers/image');
const profile=require('./controllers/profile');




  const db= knex ({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'nisha123',
    database : 'postgres'
  }
});
  

const database = {
  users: [{
    id: '124',
    name: 'jhon',
    email: 'jhon@gmail.com',
    password: 'cookies',
    entries: 0,
    joined: new Date()
  }] 
  
}

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
res.send(database.users);
})

app.post('/signin' ,(req ,res)=>{signin.handleSignin(req,res ,db,bcrypt)})

app.put('/image',(req ,res)=>{image.handleImage(req ,res, db)})


app.post('/register',(req ,res)=>{register.handleRegister(req,res ,db,bcrypt)})

app.get('/profile/:id' ,(req ,res)=>{profile.handleProfile(req ,res ,db)} )

app.post('/imageUrl',(req ,res)=>{image.handleApi(req ,res)})


app.listen(port , ()=> {
 console.log('Example app listening on port ',port);
})