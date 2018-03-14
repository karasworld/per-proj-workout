import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import firebase from '../../fire';
// import ImageUpload from '../ImageUpload/ImageUpload';
import Muscles from '../Muscles/Muscles';


export default class Profile extends Component{
    
constructor(props){
    super(props)
    this.state={
        userid: [],
        name: '',
        nameEdit: '',
        age: '',
        ageEdit: '',
        gender: '',
        genderEdit: [],
        startweight: '',
        goalweight: '',
        mode:'view'

    }

    this.handelActiveName = this.handelActiveName.bind(this);
    this.handleActiveAge = this.handleActiveAge.bind(this);
    this.handleActiveGender = this.handleActiveGender.bind(this);
    this.handleActiveStartWeight = this.handleActiveStartWeight.bind(this);
    this.handleActiveGoalWeight = this.handleActiveGoalWeight.bind(this);
    this.handleProfilePicture = this.handleProfilePicture.bind(this);
    this.signOutUser = this.signOutUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deactivate = this.deactivate.bind(this);
    
    this.saveProfile = this.saveProfile.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
}

updateUser(userid, name, age, gender){
    
    const userUpdated={
        userid,
        name,
        age,
        gender
    }
    console.log(userUpdated)
    axios
    .put('/api/userdata', userUpdated)
    .then(response=>{
        console.log(response.data)
        this.setState({userid: response.data.userid});
    })
    .catch(console.log);
    }

deactivate(id){
    axios
    .delete('/api/userdata/'+id)
    .then(response=>{
        this.setState({userid: response.id})
    })
    .catch(console.log);
    }

signOutUser() {
    firebase.auth().signOut();

    axios
    .get('/api/signout')
    .then(response=>{
        console.log("Signed Out");
        this.props.history.push("/");
    })
    .catch(error=>{console.log(error)
    })    
  }

    componentDidMount(){
        console.log(this.props.userid)
        
        axios
        .get(`/api/userdata/${this.props.userid}`)
        .then(response =>{
            console.log(response)
            this.setState({name:response.data[0].name, age:response.data[0].age, gender:response.data[0].gender, startweight:response.data[0].startweight, goalweight:response.data[0].goalweight})})

       

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
handleNameChange(e){
    this.setState({nameEdit:e.target.value});
}
handleAgeChange(e){
    this.setState({ageEdit:e.target.value});
}
handleGenderChange(e){
    this.setState({genderEdit:e.target.value});
}
saveProfile(){
    this.setState({name: this.state.nameEdit, age: this.state.ageEdit, gender: this.state.genderEdit, mode: 'view'});
}
handleEdit(){
    this.setState({mode: 'edit'});
}

    renderNameInputField(){
        if(this.state.mode === 'view'){
            return
                <div></div>;
    }else{
        return(
            <p>
            <input
            onChange={this.handleNameChange}
            value={this.state.nameEdit}
            placeholder={this.state.name}
            />
            </p>
        );
    }
}
    
    renderAgeInputField(){
        if(this.state.mode === 'view'){
            return
                <div></div>;
    }else{
        return(
            <p>
            <input
            onChange={this.handleAgeChange}
            value={this.state.ageEdit}
            placeholder={this.state.age}
            />
            </p>
        );
    }
}

    renderGenderInputField(){
        if(this.state.mode === 'view'){
            return
                <div></div>;
    }else{
        return(
            <p>
            <select onChange={e => this.handleGenderChange(e)}>
                <option>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </p>
        );
    }
}

    renderProfileButton(){
        if(this.state.mode === 'view'){
            return(
                <button onClick={this.handleEdit}>
                    Edit Profile
                </button>
            );
        }else{
            return(
                <button onClick={this.saveProfile}>
                    Save
                </button>
            );
        }
    }

    render(){      
         
        return(
            <div>
                <div>
                Profile Picture: {this.state.profilepic}
                </div>
                <div>
                    <p>Name: {this.state.name}</p>                     
                    <div>{this.renderNameInputField()}</div>
                    
                </div>
                <div>
                    <p>Age: {this.state.age}</p>
                   <div>{this.renderAgeInputField()}</div>
                    
                </div>
                <div>
                <p>gender: {this.state.gender}</p>
                    <div>{this.renderGenderInputField()}</div>
                    
                </div>
                <div>
                start weight: {this.state.startweight}
                </div>
                <div>
                goal weight: {this.state.goalweight}
                </div>
                <div>
                {this.renderProfileButton()}
                <button onClick={()=>this.updateUser(this.props.userid, this.state.name, this.state.age, this.state.gender)}>
                Update Profile
                </button>
                </div>
                <div>
                <Link to= "/">
                <button onClick={this.signOutUser}>Sign Out</button>
                </Link>
                </div>
                <div>
                    <Muscles/>
                </div>
                
                {/* <div>
                    <ImageUpload/>
                </div> */}
            </div>
        );
    }
}