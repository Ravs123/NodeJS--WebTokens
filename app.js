const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const cookieParser=require('cookie-parser')
const { requireAuth, checkUser }=require('./authenticationMiddleware/jwtAuth')

const app = express();
//Creating web tokens , render webpages using EJS , performing CRUD operations using NODEJS 
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://rajninja:ninja123@ninja.kwbfa.mongodb.net/blogs?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookie




