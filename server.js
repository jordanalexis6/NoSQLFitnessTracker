const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// html routes.
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// app.get("/exercise", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/exercise.html"));
// });

// app.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/stats.html"));
// });

// TODO: modify code below for api routes.
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

app.get("/notes", (req, res) => {
  db.Note.find({})
    .then((dbNote) => {
      res.json(dbNote);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/user", (req, res) => {
  db.User.find({})
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.Note.create(body)
    .then(({ _id }) =>
      db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true })
    )
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.User.find({})
    .populate("notes")
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err.message);
    });
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
