import React, {Component} from 'react';

export default function ExerciseInfo(props){
    return(
        <div>
        <div>{props.info.name}</div>
        <div>{props.info.description}</div>
        </div>
    )
}