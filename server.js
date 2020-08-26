const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

const path = require("path");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// html routes.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//connects to workout db/ deployment process.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

db.Workout.create({ name: "Workout Plan!" })
  .then((dbWorkout) => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).then((response) => {
    console.log(response);
    res.json(response);
  });
  //
});

app.put("/api/workouts/:id", async (req, res) => {
  db.Workout.update(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $push: { exercises: req.body } },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/api/workouts", async ({ body }, res) => {
  try {
    let data = await db.Workout.create(body);
    console.log({ data });
    res.json(data);
  } catch ({ message }) {
    res.json(message);
  }
});

app.get("/api/workouts/range", async (req, res) => {
  try {
    let data = await db.Workout.find({}).sort({ day: -1 }).limit(7);
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
