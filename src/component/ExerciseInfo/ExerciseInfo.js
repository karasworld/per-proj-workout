import React, {Component} from 'react';
import './ExerciseInfo.css';

export default function ExerciseInfo(props){
    return(
        <div>
        <div className="muscle-list">{props.info.name}</div>
        <div>{props.info.description}</div>
        </div>
    )
}