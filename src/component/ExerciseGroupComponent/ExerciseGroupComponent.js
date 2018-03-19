import React, {Component} from 'react';
import './ExerciseGroupComponent.css';

export default function ExerciseGroupComponent(props){
    return(
        <div className="exGroup-main">
            <div onClick={()=>props.exerInfo(props.workouts.id)}
            >{props.workouts.name}
            </div>
            <div>
                <button onClick={()=>props.addToRoutine(props.workouts.id, props.workouts.name)}>Add</button>
            </div>
        </div>
    )
}