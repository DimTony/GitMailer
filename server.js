require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer to send an email
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: process.env.RECEIVER,
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send(
        `<script>alert('Error sending email'); window.location = 'https://dimtony.github.io/';</script>`
      );
    } else {
      console.log("Email sent: " + info.response);
      res.send(
        `<script>alert('Email sent successfully'); window.location = 'https://dimtony.github.io/';</script>`
      );
    }
  });
});

app.get("/keep-alive", (req, res) => {
  res.status(200).send("Server is alive!");
});

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
