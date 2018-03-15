const axios = require('axios')

let routine = [];

module.exports = {
    
    getExercises:(req, res, next)=>{
        axios
        .get(`https://wger.de/api/v2/exercise/?language=2&muscles=${req.params.num}`)
        .then(response=>{
            
            res.status(200).json(response.data)
        }).catch(err=>console.log(err))
    },

    add:(req, res, next)=>{
        console.log("add")
        const dbInstance = req.app.get('db');
        const {session} = req;
        const {name} = req.body;
        const {id} = req.params;

        console.log(id, name, session, session.user, session.user[0].id)

        dbInstance.buildWorkout([id, name, session.user[0].id])
        .then((user)=>{dbInstance.getAllExercise([session.user[0].id])
            .then((user)=>{

            res.status(200).send(user)})})
        .catch((err)=>{console.log(err); res.status(500).send()})
        },

    delete:(req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {params, session} = req;
        console.log(req.session);

        dbInstance.removeExercise([params.id, session.user[0].id])
        .then((user)=> res.status(200).send(user))
        .catch(()=>res.status(500).send());
    }

}