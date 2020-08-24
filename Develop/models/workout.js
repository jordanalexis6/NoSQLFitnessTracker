const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});
//schema: exercises fields
const ExerciseSchema = new Schema({
  type: { type: String, trim: true, required: true },
  name: { type: String, trim: true, required: true },
  duration: { type: Number, trim: true, required: true },
  weight: { type: Number, trim: true, required: true },
  reps: { type: Number, trim: true, required: true },
  sets: { type: Number, trim: true, required: true },
});

const Library = mongoose.model("Library", LibrarySchema);

module.exports = Library;
