var express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var assert = require('assert');
const GameStats = require('../models/GameStats');
const checkAuth = require('../middleware/check-auth');

//do query to get username and highscores
router.get('/game_scores', async (req, res) => {
  try {
    GameStats.find().limit(10).sort({
      "highscore": -1
    }).exec(function(err, data) {
      if(err) {
        console.log('err', err);
      } else {
        //res.json(data);
        res.render('game_scores', { title: 'High Scores', results: data });
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    });
  }
});

router.post('/gamestats', checkAuth, async (req, res, next) => {
  try {
    GameStats.updateOne({'username': req.body.token.username}, {
    username: req.body.token.username,
    questionResults: req.body.questionResults,
    score: req.body.score,
    correct: req.body.correct,
    incorrect: req.body.incorrect,
    numberofGames: req.body.numberofGames,
    highscore: parseInt(req.body.highscore)
  }, {upsert : true}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log(doc);
    }
  });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    });
  }
});

router.get('/gamestats', checkAuth, (req, res, next) => {
  try {
    GameStats.findOne({'username': req.body.token.username }, (err, data) => {
      res.render('gamestats', { title: 'Game Statistics', data });
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    });
  }
});

module.exports = router;
