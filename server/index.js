require ('dotenv').config();
const cors = require('cors');
const {json} = require('body-parser');
const express = require('express');
const massive = require('massive');
const session = require('express-session')

const {
    CONNECTION_STRING,
    SESSION_SECRET

}  = process.env;

const app = express();

const port = 3001;

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
.then(dbInstance=>{
    app.set('db', dbInstance);
})
.catch(console.log)

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 525600*60*1000
        }
    })
);


app.listen(port, ()=>{
    console.log(`Here I go again on my port ${port}, going down the only port I've ever known.`);
});