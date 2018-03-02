import React, {Component} from 'react';
import axios from 'axios';

export default class Exercises extends Component{
    constructor(props){
        super(props)

        this.state = {
            exercise: this.props.selExercise
        }

    }
        
        render(){
            console.log(this.state.exercise)
            return(
                <div>{this.state.exercise.name}</div>
            )
        }
    }
