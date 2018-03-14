import React, {Component} from 'react';
import './Muscles.css'
import axios from 'axios';
import ExerciseGroupComponent from '../ExerciseGroupComponent/ExerciseGroupComponent';
import ExerciseInfo from '../ExerciseInfo/ExerciseInfo';
import RoutineComponent from '../RoutineComponent/RoutineComponent';

export default class Muscles extends Component{
    constructor(props){
        super(props)       
        
        this.state = {
            setList: [],
            exercises: [],
            selectedExercise: [],
            exercise: [],
            info: '',
            routine: [],
            selectedRoutine: []
            
        };

        this.setExercise = this.setExercise.bind(this);
        this.handleSelectedMuscle = this.handleSelectedMuscle.bind(this)
        this.exerInfo = this.exerInfo.bind(this);
        this.addToRoutine = this.addToRoutine.bind(this);
    }

    handleSelectedMuscle(num){
        this.setState({selectedExercise: num});  
        axios
        .get(`/api/exerciseList/${num}`)
        .then(response => {
            console.log(response.data)
            this.setState({exercise: response.data.results});
        });
    }

    setExercise(){
        const exer = {
            exercises: this.state.selectedExercise
        };

        axios
        .post('/api/exerciselist/:num', exer)
        .then(response => {
            console.log(response)
            this.setState({setList: response.data})
        })
        .catch(e=>alert(e));
    }
    
    exerInfo(num){
        this.setState({info: num});
        console.log(num);
    }

    addToRoutine(id, name){
        this.setState({selectedRoutine: id});
        axios
        .put(`/api/userRoutine/${id}`, {name})
        .then(response=>{
            console.log(response)
            this.setState({routine: response.data});
        })
        .catch(console.log);
    }

    delete(id){
        axios
        .delete(`/api/removeRoutine/${id}`)
        .then(response=>{
            this.setState({routine: response.data});
        })
        .catch(console.log);
    }

   
    

   //add Female/Male body images

    render(){
        var shownExercise = this.state.exercise.map((val, i)=>{
            return <ExerciseGroupComponent 
                    workouts={val} 
                    exerInfo={this.exerInfo}
                    addToRoutine={this.addToRoutine}
                    />
        })

        var selectedInfo = this.state.info && this.state.exercise.filter((val)=>val.id===this.state.info).map((val,i)=>{
            return <ExerciseInfo info={val} />
        })
        console.log(this.state.routine)
        var selectedRoutine = this.state.routine && this.state.routine.map((val)=>{
            return <RoutineComponent                    
                    workouts={val}
                    delete={this.delete}
                    />

        }
    )
        
        

        return(
            <div>
                <div>
                   <h1>Muscle Groups</h1>
                   <h4>SELECT A MUSCLE TO WORKOUT</h4>
                   <h6>click on muscle for list</h6>
                </div>
                <div>
                    <h2>Front Muscles</h2>
                   { /*use onClick event to make exercises populate*/}
                    <ul>
                        <li className="muscles_shoulders" onClick={()=>this.handleSelectedMuscle(2)} ><p>Shoulders (Anterior deltoid)</p>
                        </li>
                        <li className="muscles_biceps" onClick={()=>this.handleSelectedMuscle(1)} ><p>Biceps (Biceps brachii)</p>
                        </li>
                        <li className="muscles_in_out_biceps" onClick={()=>this.handleSelectedMuscle(13)} ><p>Inner/Outer Biceps (Brachialis)</p>
                        </li>
                        <li className="muscles_obliques" onClick={()=>this.handleSelectedMuscle(14)} ><p>Obliques (Obliquus externus abdominis)</p>
                        </li>
                        <li className="muscles_pecks" onClick={()=>this.handleSelectedMuscle(4)} ><p>Pecks (Pectoralis major)</p>
                        </li>
                        <li className="muscles_quads" onClick={()=>this.handleSelectedMuscle(10)} ><p>Quads (Quadriceps femoris)</p>
                        </li>
                        <li className="muscles_abs" onClick={()=>this.handleSelectedMuscle(6)} ><p>Abs (Rectus abdominis)</p>
                        </li>
                        <li className="muscles_lats" onClick={()=>this.handleSelectedMuscle(3)} ><p>Lats (Serratus anterior)</p>
                        </li>
                    </ul>                    
                </div>
                <div>
                    <h2>Back Muscles</h2>
                    <ul>
                    <li className="muscles_hamstrings" onClick={()=>this.handleSelectedMuscle(11)} ><p>Hamstrings (Biceps femoris)</p>
                        </li>
                        <li className="muscles_calves" onClick={()=>this.handleSelectedMuscle(7)} ><p>Calves (Gastrocnemius)</p>
                        </li>
                        <li className="muscles_butt" onClick={()=>this.handleSelectedMuscle(8)} ><p>Butt (Gluteus maximus)</p>
                        </li>
                        <li className="muscles_back_lats" onClick={()=>this.handleSelectedMuscle(12)} ><p>Lats (Latissimus dorsi)</p>
                        </li>
                        <li className="muscles_low_calves" onClick={()=>this.handleSelectedMuscle(15)} ><p>Lower Calves (Soleus)</p>
                        </li>
                        <li className="muscles_trapes" onClick={()=>this.handleSelectedMuscle(9)} ><p>Traps (Trapezius)</p>
                        </li>
                        <li className="muscles_triceps" onClick={()=>this.handleSelectedMuscle(5)} ><p>Triceps (Triceps brachii)</p>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2>Exercise List</h2>
                    <h4>SELECT AN EXERCISE</h4>
                    <h6>click on Exercise Name for directions</h6>
                    {shownExercise}
                </div>
                <div>
                    <h3>Instructions</h3>
                    {selectedInfo}
                </div>
                <div>
                    <h3>SETLIST</h3>
                    {selectedRoutine}
                </div>
            </div>
        )
    }
}