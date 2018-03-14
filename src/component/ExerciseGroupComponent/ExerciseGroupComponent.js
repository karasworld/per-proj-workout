import React, {Component} from 'react';

export default function ExerciseGroupComponent(props){
    return(
        <div>
            <div onClick={()=>props.exerInfo(props.workouts.id)}
            >{props.workouts.name}
            </div>
            <div>
                <button onClick={()=>props.addToRoutine(props.workouts.id, props.workouts.name)}>Add</button>
            </div>
        </div>
    )
}