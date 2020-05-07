const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index", { title: "welcome" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact/send", (req, res) => {
  const transporter = new nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mail",
      pass: "",
    },
  });

  const mailOptions = {
    from: "My Name <mail@mama.mama>",
    to: "mail",
    subject: "subjct",
    text:
      "name: " +
      req.body.name +
      "Email: " +
      req.body.email +
      "message: " +
      req.body.message,
    html: "<p>You have a submission</p>",
  };

  transporter.sendMail(mailOptions, (err, message) => {
    if (err) {
      console.log(err);
      res.redirect("/");
    } else {
      console.log("Message sent");
      res.redirect("/");
    }
  });
});

app.listen(3000);
console.log("server is running");
