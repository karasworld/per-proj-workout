import React, {Component} from 'react';

import firebase from '../../fire';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        userid: '',
        name: '',
        age: '', 
        gender: [], 
        startweight: '', 
        goalweight: '',
        // downloadURL: '',
        // file: '',
        // imagePreview: ''
      };


      this.createAccount = this.createAccount.bind(this);
      this.loginUser = this.loginUser.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handleNameInput = this.handleNameInput.bind(this);
      this.handleAgeInput = this.handleAgeInput.bind(this);
      this.handleSelectedGender = this.handleSelectedGender.bind(this);
      this.handleStartWeight = this.handleStartWeight.bind(this);
      this.handleGoalWeight = this.handleGoalWeight.bind(this);
      
      // this.handleDownloadURL = this.handleDownloadURL.bind(this);
      // this.handlePreview = this.handlePreview.bind(this);
      // this.handleUpload = this.handleUpload.bind(this);
      
    }

    handleEmail(e){
      this.setState({email: e.target.value})
    }

    handleNameInput(e){
      this.setState({name: e.target.value})
    }
    handleAgeInput(e){
      this.setState({age: e.target.value})
    }
    handleSelectedGender(e){
      this.setState({gender: e.target.value})
    }
    handleStartWeight(e){
      this.setState({startweight: e.target.value})
    }
    handleGoalWeight(e){
      this.setState({goalweight: e.target.value})
    }
    // handleDownloadURL(e){
    //   this.setState({downloadURL: e.target.value})
    // }
    

    
    handleCreate(e){
      const {userid, name, age, gender, startweight, goalweight, downloadURL, startingbodypic, email} = this.state
      
      axios
      .post('/api/createpage', {userid, name, age, gender, startweight, goalweight, downloadURL, startingbodypic, email})
      .then(response => response.data)
      .catch(console.log)
    }

    


    createAccount() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
          console.log(response)          
          this.setState({ userid: response.uid }, () => this.handleCreate());

        });
    }
  
    loginUser() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => { console.log('success hit', result)
          axios.post('/api/login', {email: this.state.email})
          // this.props.history.push(`/Profile/:id`)
        });
    }
  
  

    

  //   handlePreview(file){
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //         this.setState({
  //             file: file[0],
  //             imagePreview: reader.result
  //         });
  //     };
  //     reader.readAsDataURL(file[0]);
  // }

  // handleUpload(){
  //     const storageRef = firebase.storage().ref();
  //     const uploadTask = storageRef
  //         .child(`profilePictures/${this.state.file.name}`)
  //         .put(this.state.file);
  //     uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {
  //             console.log(snapshot);
  //         },
  //         (error) => {},
  //         (success) => {
  //             console.log(uploadTask.snapshot.downloadURL);
  //         },
  //     );
  // }
  
    componentDidMount() {
      firebase.auth().onAuthStateChanged((result) => {
        console.log(result);
      });
    }
  
    render() {
      return (
        <div>
          {this.state.userid && <h1>{this.state.userid}</h1>}
          <input
            type="text"
            placeholder="email"
            onChange={e => this.handleEmail(e)}
          />
  
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
                this.setState({ password: event.target.value });
            }}
          />

          <div>
          <button onClick={this.loginUser}>Login</button>
          </div>

          <div>
            <h3>Name</h3>
            <input type="text" onChange={e => this.handleNameInput(e)}/>
          </div>
          <div>
            <h3>Age</h3>
            <input type="text" onChange={e => this.handleAgeInput(e)}/>
          </div>
          <div>
            <h3>Gender</h3>
            <select onChange={e => this.handleSelectedGender(e)}>
              <option>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <h3>Start Weight</h3>
            <input type="text" onChange={e => this.handleStartWeight(e)}/>
          </div>
          <div>
            <h3>Goal Weight</h3>
            <input type="text" onChange={e => this.handleGoalWeight(e)}/>
          </div>   
          {/* <div>
            <h1>Upload New Body Image</h1>

              {this.state.imagePreview && <img src={this.state.imagePreview}/>}

          <input
            placeholder="ImageUpload"
            type="file"
            onChange={(event)=>{
                this.handlePreview(event.target.files)
            }}
            />

          <button onClick={this.handleUpload}> Upload Image </button>

          </div>        */}
          <div>
          <button onClick={this.createAccount}> Create Account </button>
          </div>
        </div>
      );
    }
  }