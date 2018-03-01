module.exports = {


createAccount:(req, res, next)=>{
    const dbInstance = req.app.get('db');
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
    const {email} = req.body;

    const dbInstance = req.app.get('db');
    dbInstance.getUserByID([email])
    .then((response)=>{
        console.log(response);
         res.status(200).send(response)
        req.session.user = response.data})
    .catch((err)=>res.status(500).send(err, "You're in the wrong neighborhood!"));

    // if(user){
    //     session.user.email = user.email;
    //     res.status(200).send(session.user);
    // }else{
    //     res.status(500).send("You're in the wrong neighborhood!")
    // }
},

getUser:(req, res, next)=>{
    
    const dbInstance = req.app.get('db');

    dbInstance.getUserByID([req.params.id])
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

// grabData:(req, res, next)=>{

// }

}