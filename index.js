const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(
  cors({
    origin: [
      "https://aditya.cleverstudio.in",
      "https://adidecodes.me",
      "https://portfolio-d54fj5sga-adidecodes.vercel.app",
    ],
  })
);

app.use(express.json());

const ID = process.env.VITE_ID;
const PASS = process.env.VITE_PASS;
const REC = process.env.VITE_REC;

app.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  var transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: ID,
      pass: PASS,
    },
  });

  var mailOptions = {
    from: `Aditya Singh - PortFolio<${ID}>`,
    to: REC,
    subject: `New Message From ${req.body.name}`,
    text: req.body.message,
    html: `
        <div style="padding:10px;border-style: ridge">
        <h2>Hey Aditya, You have a new contact request from your Portfolio</h2>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json(error);
    } else {
      res.json({
        status: true,
        respMesg: "Email Sent Successfully",
      });
    }
  });
});

app.listen(4000, () => {
  console.log(`Server is listening on port 4000`);
});
