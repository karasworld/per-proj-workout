require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const session = require('express-session');
const massive = require('massive');

const mainCtrl = require('./controller/mainCtrl');

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
            maxAge: 1000
        }
    })
);

app.post('/api/login', mainCtrl.login);
app.post('/api/createpage', mainCtrl.createAccount);
app.get('/api/userdata/:id', mainCtrl.getUser);
app.put('/api/userdata/:id', mainCtrl.update);
app.delete('/api/userdata/:id', mainCtrl.destroy);

app.get('/api/exerciselist/:num', mainCtrl.getExercises);



app.listen(port, ()=>{
    console.log(`Here I go again on my port ${port}, going down the only port I've ever known.`);
});