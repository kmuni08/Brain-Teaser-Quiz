const express = require('express');
const path = require('path');
const router = express.Router()
const mongoose = require('mongoose');
require('./config/config');

const server = express();

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.use(express.json());

var PORT = 3000;

//Connect to DB:
mongoose.connect(
  process.env.MONGODB_URI|| 'mongodb://localhost:27020/test',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log('Connected to DB');
  });

//read input from browser.
server.use(express.urlencoded({extended: true}))

const userRoutes = require('./routes/user');
server.use('/user', userRoutes);

const gameResults = require('./routes/gamestats');
server.use('/scores', gameResults);

server.listen(PORT, () => {
  console.log('Server is running on ' + PORT);
});
