import React, {Component} from 'react';
import './Muscles.css'
import axios from 'axios';
import ExerciseGroupComponent from '../ExerciseGroupComponent/ExerciseGroupComponent';
import ExerciseInfo from '../ExerciseInfo/ExerciseInfo';

export default class Muscles extends Component{
    constructor(props){
        super(props)       
        
        this.state = {
            setList: [],
            exercises: [],
            selectedExercise: [],
            exercise: [],
            info: ''
        }
        this.setExercise = this.setExercise.bind(this);
        this.handleSelectedExercise = this.handleSelectedExercise.bind(this)
        this.exerInfo = this.exerInfo.bind(this);
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

    

    handleSelectedExercise(num){
        this.setState({selectedExercise: num});  
        axios
        .get(`/api/exerciseList/${num}`)
        .then(response => {
            console.log(response.data)
            this.setState({exercise: response.data.results});
        });

    }

    exerInfo(num){
        this.setState({info: num});
        console.log(num);
    }

    

   //add Female/Male body images

    render(){
        var shownExercise = this.state.exercise.map((val, i)=>{
            return <ExerciseGroupComponent workouts={val} exerInfo={this.exerInfo}/>
        })

        var selectedInfo = this.state.info && this.state.exercise.filter((val)=>val.id===this.state.info).map((val,i)=>{
            return <ExerciseInfo info={val} />
        })
        
        

        return(
            <div>
                <div>
                   <h1>Muscle Groups</h1>
                </div>
                <div>
                    <h2>Front Muscles</h2>
                   { /*use onClick event to make exercises populate*/}
                    <ul>
                        <li className="muscles_shoulders" onClick={()=>this.handleSelectedExercise(2)} ><p>Shoulders (Anterior deltoid)</p>
                        </li>
                        <li className="muscles_biceps" onClick={()=>this.handleSelectedExercise(1)} ><p>Biceps (Biceps brachii)</p>
                        </li>
                        <li className="muscles_in_out_biceps" onClick={()=>this.handleSelectedExercise(13)} ><p>Inner/Outer Biceps (Brachialis)</p>
                        </li>
                        <li className="muscles_obliques" onClick={()=>this.handleSelectedExercise(14)} ><p>Obliques (Obliquus externus abdominis)</p>
                        </li>
                        <li className="muscles_pecks" onClick={()=>this.handleSelectedExercise(4)} ><p>Pecks (Pectoralis major)</p>
                        </li>
                        <li className="muscles_quads" onClick={()=>this.handleSelectedExercise(10)} ><p>Quads (Quadriceps femoris)</p>
                        </li>
                        <li className="muscles_abs" onClick={()=>this.handleSelectedExercise(6)} ><p>Abs (Rectus abdominis)</p>
                        </li>
                        <li className="muscles_lats" onClick={()=>this.handleSelectedExercise(3)} ><p>Lats (Serratus anterior)</p>
                        </li>
                    </ul>                    
                </div>
                <div>
                    <h2>Back Muscles</h2>
                    <ul>
                    <li className="muscles_hamstrings" onClick={()=>this.handleSelectedExercise(11)} ><p>Hamstrings (Biceps femoris)</p>
                        </li>
                        <li className="muscles_calves" onClick={()=>this.handleSelectedExercise(7)} ><p>Calves (Gastrocnemius)</p>
                        </li>
                        <li className="muscles_butt" onClick={()=>this.handleSelectedExercise(8)} ><p>Butt (Gluteus maximus)</p>
                        </li>
                        <li className="muscles_back_lats" onClick={()=>this.handleSelectedExercise(12)} ><p>Lats (Latissimus dorsi)</p>
                        </li>
                        <li className="muscles_low_calves" onClick={()=>this.handleSelectedExercise(15)} ><p>Lower Calves (Soleus)</p>
                        </li>
                        <li className="muscles_trapes" onClick={()=>this.handleSelectedExercise(9)} ><p>Traps (Trapezius)</p>
                        </li>
                        <li className="muscles_triceps" onClick={()=>this.handleSelectedExercise(5)} ><p>Triceps (Triceps brachii)</p>
                        </li>
                    </ul>
                </div>
                <div>
                    {shownExercise}
                </div>
                <div>
                    {selectedInfo}
                </div>
            </div>
        )
    }
}