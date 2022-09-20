import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
// import {GoogleSpreadsheet} from 'google-spreadsheet';

// const doc = new GoogleSpreadsheet('1vvPMUr-Bzn1EY4_ULlw1Nw_ElybuRKvQU8N7aaXYBEI');
// console.log(doc);

import bcrypt from "bcrypt";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(urlencoded());
app.use(cors());

const encrpt = (password) => {
  const salt = bcrypt.genSaltSync(10);
  let hashed = bcrypt.hashSync(password, salt);
  return hashed;
};
mongoose.connect("mongodb://localhost:27017/myloginRegisterDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  position: Object,
  widgets: Array,
});
const widgetSchema = mongoose.Schema({
  name: String,
  cityName: String,
  userEmail: String,
  position: Object,
  img: Array,
});

const dataSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
});

const User = new mongoose.model("User", userSchema);
const Data = new mongoose.model("Data", dataSchema);
const Widget = new mongoose.model("Widget", widgetSchema);

app.post("/setposition", async (req, res) => {
  if (req.body) {
    // let user = await User.findOne({ email: req.body.email });
    await Widget.updateOne(
      { _id: req.body._id },
      {
        position: { x: req.body.position.x, y: req.body.position.y },
      }
    );
    res.send({ message: "Successfully" });
  }
});
app.post("/addwidget", async (req, res) => {
  if (req) {
    if (req.body.name == "weatherWidget") {
      const { name, cityName, position, userEmail } = req.body;
      const W_widget = new Widget({
        name: name,
        cityName: cityName,
        position: { x: 20, y: 20 },
        userEmail: userEmail,
      });

      W_widget.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Added Successfully" });
        }
      });
    } else if (req.body.name == "slideWidget") {
      const { name, img, position, userEmail } = req.body;
      const S_widget = new Widget({
        name: name,
        img: img,
        position: { x: 20, y: 20 },
        userEmail: userEmail,
      });

      S_widget.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Added Successfully" });
        }
      });
    } else {
      return res.send({ message: "invalid Widget Name" });
    }
  }
});

app.post("/getwidgets", async (req, res) => {
  let widgets = await Widget.find({ userEmail: req.body.email });
  if (widgets) res.send(widgets);
  else res.send({ message: "NO Data Found" });
});

app.post("/getposition", async (req, res) => {
  if (req.body) {
    let user = await User.findOne({ email: req.body.email });
    return res.status(200).json(user);
  }
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already register" });
    } else {
      const pass = encrpt(password);
      // console.log(password);
      const user = new User({
        name,
        email,
        password: pass,
        position: { x: 50, y: 50 },
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Register" });
        }
      });
    }
  });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }, (err, user) => {
    if (user) {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (validPassword) {
        res.send({ message: "Login Successfully", user: user });
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.post("/posts", async (req, res) => {
  const { title, contnet, image, id } = req.body;
  if (id) {
    if(image){
        await Data.updateOne(
            { _id: id },
            { title: title, content: contnet, image: image }
          );
    }else{
        await Data.updateOne(
            { _id: id },
            { title: title, content: contnet }
          );
    }
    res.send({ message: "Posted Successfully" });
    return;
  } else {
    const data = new Data({
      title: title,
      content: contnet,
      image: image,
    });
    data.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Posted Successfully" });
      }
    });
  }
});
app.get("/getposts", async (req, res) => {
  let allPosts = await Data.find({});
  return res.status(200).json(allPosts);
});

app.delete("/posts/:id", (req, res) => {
  Data.deleteOne({ _id: req.params.id }).then(() => {
    // res.send({message:"Deleted Successfull"})
  });
});

app.listen(9002, () => {
  console.log("Server Started ");
});
