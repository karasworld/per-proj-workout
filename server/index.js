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

// app.get('db')
// .getUserByID([profile.id])
// .then(response=>{
//     if(!response[0]){
//         const { userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic} = profile._json

// app.get('db')
// .createUserByID([userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic])
// .then(created => {
//     return done(null, created[0]);
// });
//     }else{
//         return done(null, response[0])
//     }
// });


app.post('/api/login', mainCtrl.login);
app.post('/api/createpage', mainCtrl.createAccount);
app.get('/api/userdata/:id', mainCtrl.getUser);
app.put('/api/userdata/:id', mainCtrl.update);
app.delete('/api/userdata/:id', mainCtrl.destroy);



app.listen(port, ()=>{
    console.log(`Here I go again on my port ${port}, going down the only port I've ever known.`);
});