const axios = require('axios')

module.exports = {


createAccount:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {session} = req;
    const {userid, name, age, gender, startweight, goalweight, downloadURL, startingbodypic, email} = req.body;

    dbInstance.createUserByID([userid, name, age, gender, startweight, goalweight, downloadURL, startingbodypic, email])
    .then((user)=>{
        
        req.session.id = user[0].id
        setTimeout(() => {
            
        }, 1000);
        res.status(200).send()})
    .catch(()=>res.status(500).send());
},

login:(req, res, next)=>{
    const {session} = req;
    const {userid, email} = req.body;

    const dbInstance = req.app.get('db');
    console.log('in login')
    dbInstance.getUserByEmail([email])
    .then((response)=>{
        console.log(response, "in login respnse");
        session.user = response
         res.status(200).send(response)
         //check respnse in console.log, set userid to sessions to get the update sql working.LOOK AT NODE 3*****req.session.userid
       })
    .catch((err)=>res.status(500).send(err, "You're in the wrong neighborhood!"));
},

//User
getUser:(req, res, next)=>{
    
    const dbInstance = req.app.get('db');

    dbInstance.getUserByID([req.params.id])
    .then(user => res.status(200).send(user))
    .catch((err)=> { console.log(err); res.status(500).send() });
},

update:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {session} = req;
    const {userid, name, age, gender} = req.body;

   console.log(req.body, "1", session)
   

    dbInstance.updateUser([userid, name, age, gender])
    .then(response=> res.json(response[0]))
    .catch(console.log);
},

signOut:(req, res, next) => {
    console.log("sessionintact", req.session)
    req.session.destroy();
    console.log("session destroyed", req.session)
    res.status(200).json("Session Destroyed");
  },

// Might implement later

// destroy:(req, res, next)=>{
//     const dbInstance = req.app.get('db');
//     const {params} = req;

//     dbInstance.deleteUser([params.id])
//     .then(()=> res.status(200).send())
//     .catch(()=>res.status(500).send());
// },





}
