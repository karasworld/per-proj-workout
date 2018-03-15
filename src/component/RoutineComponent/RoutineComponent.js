import React, {Component} from 'react';
import axios from 'axios';

export default class RoutineComponent extends Component{
    constructor(props){
        super(props)

        this.state = {

        }

        //bindings
    }

    //handlers/methods

    render(){
        return(
            <div>
                <div>                    
                    <h3>{this.props.workouts.exercisename}</h3>
                    <div>
                {/* <button>Next</button>
                <button>Previous</button> */}
                    </div>
                    <div>
                        <button onClick={()=>this.props.delete(this.props.workouts.exidprime)}>
                        Remove
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}