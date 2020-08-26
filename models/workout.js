const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema: exercises fields
const ExerciseSchema = new Schema({
  day: {
    type: Number,
    default: new Date().setDate(new Date().getDate()),
  },
  exercises: Array,
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
