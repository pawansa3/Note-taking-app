const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const config = require("./config/config").get(process.env.NODE_ENV);
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true
});

const { User } = require("./models/user");
const { Note } = require("./models/note");
const { auth } = require("./middleware/auth");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("client/build"));

// GET

app.get("/api/auth", auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  });
});

app.get("/api/logout", auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// All Requests for Note
// get one note
app.get("/api/getNote", (req, res) => {
  let id = req.query.id;
  Note.findById(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

// get all notes
app.get("/api/notes", (req, res) => {
  // localhost:3001/api/books?skip=3&limit=2&order=asc
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  // ORDER = asc || desc
  Note.find()
    .skip(skip)
    .sort({ _id: order })
    .limit(limit)
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
});

app.get("/api/user_notes", (req, res) => {
  Note.find({ userId: req.query.user }).exec((err, docs) => {
    if (err) return res.status(400).send(err);
    res.send(docs);
  });
});

// POST REQUEST
app.post("/api/note", (req, res) => {
  const note = new Note(req.body);
  note.save((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      post: true,
      noteId: doc._id
    });
  });
});

app.post("/api/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      user: doc
    });
  });
});

app.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        isAuth: false,
        message: "Auth Failed, invalid email."
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          isAuth: false,
          message: "Auth Failed, invalid password."
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("auth", user.token).json({
          isAuth: true,
          id: user._id,
          email: user.email
        });
      });
    });
  });
});

// UPDATE
app.post("/api/note_update", (req, res) => {
  Note.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      doc
    });
  });
});

// DELETE
app.delete("/api/delete_note", (req, res) => {
  let id = req.query.id;
  Note.findByIdAndRemove(id, (err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json(true);
  });
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendfile(path, resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
