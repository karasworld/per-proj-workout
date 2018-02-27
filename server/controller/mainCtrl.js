module.exports = {


createAccount:(req, res, next)=>{
    console.log("work!!!!!")
    const dbInstance = req.app.get('db');
    const {userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic} = req.body;

    dbInstance.createUserByID([userid, name, age, gender, startweight, goalweight, profilepic, startingbodypic])
    .then(()=>res.status(200).send())
    .catch(()=>res.status(500).send());
},

login:(req, res, next)=>{
    const {session} = req;
    const {email} = req.body;

    const user = user.find(user=>user.email === email);

    if(user){
        session.user.email = user.email;
        res.status(200).send(session.user);
    }else{
        res.status(500).send("You're in the wrong neighborhood!")
    }
},

getUser:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {params} = req;

    dbInstance.getUserbyID([params.id])
    .then(user => res.status(200).send(user))
    .catch(()=> res.status(500).send());
},

update:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {params, query} = req;

    dbInstance.updateUser([params.id, query.desc])
    .then(()=> res.status(200).send())
    .catch(()=> res.status(500).send());
},

destroy:(req, res, next)=>{
    const dbInstance = req.app.get('db');
    const {params} = req;

    dbInstance.deleteUser([params.id])
    .then(()=> res.status(200).send())
    .catch(()=>res.status(500).send());
}

}