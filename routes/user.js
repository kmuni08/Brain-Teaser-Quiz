var express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import User model.

const User = require('../models/Users');


router.post('/register', async (req, res, next) => {
  try {
    let user = await User.find({ username: req.body.username }).exec();

    if(user.length >= 1) {
      return res.status(400).json({
        message: 'Username exists'
      });
    }

    let hash = await bcrypt.hash(req.body.password, 10);

    user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hash
    });
    let result = await user.save();
    console.log(result);
    return res.status(200).redirect('/login.html');
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
});

//make sure users can login and have a token which they can use
//for protected routes.

router.post('/login', async (req, res, next) => {
  console.log(req.body);
  try {
    let user = await User.find({ username: req.body.username }).exec();

    if(user.length < 1) {
      return res.status(404).json({
        message: 'Auth failed'
      });
    }
    let result = await bcrypt.compare(req.body.password, user[0].password);

    if(result) {
      let token = jwt.sign(
        {
          username: user[0].username,
          userId: user[0]._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({token: token});
    }
    else {
      return res.status(404).json({
        message: 'Auth failed'
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    });
  }
});


module.exports= router;
