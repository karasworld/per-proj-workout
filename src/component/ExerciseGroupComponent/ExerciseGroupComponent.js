import React, {Component} from 'react';

export default function ExerciseGroupComponent(props){
    return(
        <div onClick={()=>props.exerInfo(props.workouts.id)}
        >{props.workouts.name}</div>
    )
}