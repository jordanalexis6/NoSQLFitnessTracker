const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//schema: exercises fields
const ExerciseSchema = new Schema({
  type: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  duration: { type: Number, trim: true, required: true },
  weight: { type: Number, trim: true, required: true },
  reps: { type: Number, trim: true, required: true },
  sets: { type: Number, trim: true, required: true },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
