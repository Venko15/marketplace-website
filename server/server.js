const express = require('express');
const app = express();
const port = 3000;
const {Pool} = require("pg");
require("dotenv").config()

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT, // or the port on which your PostgreSQL server is running
});

let rootDir = '../';

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', function(request, response){
  response.sendFile('client/html/index.html', {root:rootDir});
});
app.get('/login', function(request, response){
  response.sendFile('client/html/login.html', {root:rootDir});
});
app.get('/register', function(request, response){
  response.sendFile('client/html/register.html', {root:rootDir});
});
app.get('/search', function(request, response){
  response.sendFile('client/html/search.html', {root:rootDir});
});

app.get('/product', function(request, response){
  response.sendFile('client/html/product.html', {root:rootDir});
});
app.get('/user', function(request, response){
  response.sendFile('client/html/user.html', {root:rootDir});
});


