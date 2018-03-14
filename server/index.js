require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const {json} = require('body-parser');
const session = require('express-session');
const massive = require('massive');

const checkForSession = require('./middlewares/checkForSession');

const mainCtrl = require('./controller/mainCtrl');
const routineCtrl = require('./controller/routineCtrl');

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
            maxAge:1000*100*10
        }
        
    })
);
// app.use(checkForSession);

app.post('/api/login', mainCtrl.login);
app.post('/api/createpage', mainCtrl.createAccount);
app.get('/api/userdata/:id', mainCtrl.getUser);
app.put('/api/userdata/', mainCtrl.update);
app.get('/api/signout', mainCtrl.signOut)
// app.delete('/api/userdata/:id', mainCtrl.destroy);

app.get('/api/exerciselist/:num', routineCtrl.getExercises);
app.put('/api/userRoutine/:id', routineCtrl.add);
app.delete('/api/removeRoutine', routineCtrl.delete);


app.listen(port, ()=>{
    console.log(`Here I go again on my port ${port}, going down the only port I've ever known.`);
});