const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//gameSchema

const gameSchema = new Schema({
  difficulty: String,
  money: String,
  isRight: String
});

//userSchema
const gameStatsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String },
  questionResult: { type: "array", "questionResult": [gameSchema] },
  score: { type: Number },
  correct: { type: Number },
  incorrect: { type: Number },
  numberofGames: { type: String },
  highscore: { type: Number },
},
{ typeKey: `$type` });

module.exports = mongoose.model('GameStats', gameStatsSchema);
