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
         res.status(200).send(response)
         //check respnse in console.log, set userid to sessions to get the update sql working.LOOK AT NODE 3*****req.session.userid
        req.session.user = response.user})
    .catch((err)=>res.status(500).send(err, "You're in the wrong neighborhood!"));
},

//User
getUser:(req, res, next)=>{
    
    const dbInstance = req.app.get('db');
    console.log(req.session, "in getUser")

    dbInstance.getUserByID([req.params.id])
    .then(user => res.status(200).send(user))
    .catch(()=> res.status(500).send());
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

destroy:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {params} = req;

    dbInstance.deleteUser([params.id])
    .then(()=> res.status(200).send())
    .catch(()=>res.status(500).send());
},



getExercises:(req, res, next)=>{
    axios
    .get(`https://wger.de/api/v2/exercise/?language=2&muscles=${req.params.num}`)
    .then(response=>{
        
        res.status(200).json(response.data)
    }).catch(err=>console.lof(err))
}

}