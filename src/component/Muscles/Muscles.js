import React, {Component} from 'react';
import './Muscles.css'
import axios from 'axios';
import ExerciseGroupComponent from '../ExerciseGroupComponent/ExerciseGroupComponent'

export default class Muscles extends Component{
    constructor(props){
        super(props)       
        
        this.state = {
            setList: [],
            exercises: [],
            selectedExercise: [],
            exercise: []
        }
        this.setExercise = this.setExercise.bind(this);
        // this.updateShoulders = this.updateShoulders.bind(this);
        this.handleSelectedExercise = this.handleSelectedExercise.bind(this)
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
        this.setState({selectedExercise: num});  axios
        .get(`/api/exerciseList/${num}`)
        .then(response => {
            console.log(response.data)
            this.setState({exercise: response.data.results});
        });

    }

   //add Female/Male body images

    render(){
        var shownExercise = this.state.exercise.map((val, i)=>{
            return <ExerciseGroupComponent workouts={val} />
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
                        <li className="muscles_shoulders" onClick={()=>this.handleSelectedExercise(2)} ><p>Anterior deltoid (Shoulders)</p>
                        </li>
                        <li className="muscles_biceps" onClick={()=>this.handleSelectedExercise(1)} ><p>Biceps brachii (Biceps)</p>
                        </li>
                        <li className="muscles_in_out_biceps" onClick={()=>this.handleSelectedExercise(13)} ><p>Brachialis (Inner/Outer Biceps)</p>
                        </li>
                        <li className="muscles_obliques" onClick={()=>this.handleSelectedExercise(14)} ><p>Obliquus externus abdominis (Obliques)</p>
                        </li>
                        <li className="muscles_pecks" onClick={()=>this.handleSelectedExercise(4)} ><p>Pectoralis major (Pecks)</p>
                        </li>
                        <li className="muscles_quads" onClick={()=>this.handleSelectedExercise(10)} ><p>Quadriceps femoris (Quads)</p>
                        </li>
                        <li className="muscles_abs" onClick={()=>this.handleSelectedExercise(6)} ><p>Rectus abdominis (Abs)</p>
                        </li>
                        <li className="muscles_lats" onClick={()=>this.handleSelectedExercise(3)} ><p>Serratus anterior (Lats)</p>
                        </li>
                    </ul>                    
                </div>
                <div>
                    <h2>Back Muscles</h2>
                    <ul>
                    <li className="muscles_hamstrings" onClick={()=>this.handleSelectedExercise(11)} ><p>Biceps femoris (Hamstrings)</p>
                        </li>
                        <li className="muscles_calves" onClick={()=>this.handleSelectedExercise(7)} ><p>Gastrocnemius (Calves)</p>
                        </li>
                        <li className="muscles_butt" onClick={()=>this.handleSelectedExercise(8)} ><p>Gluteus maximus(Butt)</p>
                        </li>
                        <li className="muscles_back_lats" onClick={()=>this.handleSelectedExercise(12)} ><p>Latissimus dorsi (Lats)</p>
                        </li>
                        <li className="muscles_low_calves" onClick={()=>this.handleSelectedExercise(15)} ><p>Soleus(Lower Calves)</p>
                        </li>
                        <li className="muscles_trapes" onClick={()=>this.handleSelectedExercise(9)} ><p>Trapezius(Trapes)</p>
                        </li>
                        <li className="muscles_triceps" onClick={()=>this.handleSelectedExercise(5)} ><p>Triceps brachii(Triceps)</p>
                        </li>
                    </ul>
                </div>
                {shownExercise}
            </div>
        )
    }
}