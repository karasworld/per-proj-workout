import React, {Component} from 'react';
import './Muscles.css'
import axios from 'axios';

export default class Muscles extends Component{
    constructor(props){
        super(props)       
        
        this.state = {
            setList: [],
            exercises: [],
            selectedExercise: []
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

    // updateShoulders(selectedShoulder){
    //     console.log('working shoulders!')
    //     const shouldersUpdated= {
    //         selectedShoulder
    //     }
    //     axios
    //     .put
    // }

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
        return(
            <div>
                <div>
                   <h1>Muscle Groups</h1>
                </div>
                <div>
                    <h2>Front Muscles</h2>
                   { /*use onClick event to make exercises populate*/}
                    <ul>
                        <li className="muscles_sholders" onClick={()=>this.handleSelectedExercise(2)} ><p>Anterior deltoid (Shoulders)</p>
                        </li>
                        <li><p>Biceps brachii (Biceps)</p>
                        </li>
                        <li><p>Brachialis (Inner/Outer Biceps)</p>
                        </li>
                        <li><p>Obliquus externus abdominis (Obliques)</p>
                        </li>
                        <li><p>Pectoralis major (Pecks)</p>
                        </li>
                        <li><p>Quadriceps femoris (Quads)</p>
                        </li>
                        <li><p>Rectus abdominis (Abs)</p>
                        </li>
                        <li><p>Serratus anterior (Lats)</p>
                        </li>
                    </ul>                    
                </div>
                <div>
                    <h2>Back Muscles</h2>
                    <ul>
                    <li><p>Biceps femoris (Hamstrings)</p>
                        </li>
                        <li><p>Gastrocnemius (Calves)</p>
                        </li>
                        <li><p>Gluteus maximus(Butt)</p>
                        </li>
                        <li><p>Latissimus dorsi (Lats)</p>
                        </li>
                        <li><p>Soleus(Lower Calves)</p>
                        </li>
                        <li><p>Trapezius(Trapes)</p>
                        </li>
                        <li><p>Triceps brachii(Triceps)</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}