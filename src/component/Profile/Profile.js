import React, {Component} from 'react';
import axios from 'axios';
import firebase from '../../fire';
import ImageUpload from '../ImageUpload/ImageUpload';

export default class Profile extends Component{
    
constructor(props){
    super(props)
    this.state={
        user: [],
        name: '',
        age: '',
        gender: '',
        startweight: '',
        goalweight: '',
        profilepic: ''
        

    }

    this.handelActiveName = this.handelActiveName.bind(this);
    this.handleActiveAge = this.handleActiveAge.bind(this);
    this.handleActiveGender = this.handleActiveGender.bind(this);
    this.handleActiveStartWeight = this.handleActiveStartWeight.bind(this);
    this.handleActiveGoalWeight = this.handleActiveGoalWeight.bind(this);
    this.handleProfilePicture = this.handleProfilePicture.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    
}



signOutUser() {
    firebase.auth().signOut();
  }

    componentDidMount(){
        axios
        .get(`/api/userdata/${this.props.userid}`)
        .then(response =>{
            console.log(response)
            this.setState({profilepic: response.data[0].profilepic, name:response.data[0].name, age:response.data[0].age, gender:response.data[0].gender, startweight:response.data[0].startweight, goalweight:response.data[0].goalweight})})

}

handelActiveName(e){
    this.setState({name: e.target.value})
}
handleActiveAge(e){
    this.setState({age: e.target.value})
}
handleActiveGender(e){
    this.setState({gender: e.target.value})
}
handleActiveStartWeight(e){
    this.setState({startweight: e.target.value})
}
handleActiveGoalWeight(e){
    this.setState({goalweight: e.target.value})
}
handleProfilePicture(e){
    this.setState({profilepic: e.target.value})
}

    render(){
        
        return(
            <div>
                <div>
                Profile Picture: {this.state.profilepic}
                </div>
                <div>
                name: {this.state.name}
                </div>
                <div>
                age: {this.state.age}
                </div>
                <div>
                gender: {this.state.gender}
                </div>
                <div>
                start weight: {this.state.startweight}
                </div>
                <div>
                goal weight: {this.state.goalweight}
                </div>
                <div>
                <button onClick={this.signOutUser}>Sign Out</button>
                </div>
                {/* <div>
                    <ImageUpload/>
                </div> */}
            </div>
        );
    }
}