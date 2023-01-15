import React from 'react';
import './SignUp.scss'
import RadioButton from "../../components/RadioButton/RadioButton";
import axios, { HttpStatusCode } from "axios";

export default class SignUp extends React.Component{

  constructor(props) {
    super(props);
    this.state = {email: ""};
    this.state = {password: ""};
    //this.handleEmailChange = this.handleEmailChange.bind(this);
    //this.handlePasswordChange = this.handlePasswordChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e){
    var value = e.target.value;
    this.setState({email: value});
  }

  handlePasswordChange(e){
    var value = e.target.value;
    this.setState({password: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      Email: this.state.email,
      Password: this.state.password,
      RememberMe: true,
      ReturnUrl: "string"
    };
    const url = 'http://127.0.0.1:5000/Authorization/Authorize';
    // let request = new XMLHttpRequest();
    // request.open("POST", url);
    // request.send(data);
    // request.onload = () => {
    //     if (request.status === 200) {
    //         alert(request.response);
    //     } else {
    //         alert(`Error: ${request.status} ${request.statusText}`);
    //     }
    // }
    axios.post(url,data).then((result) =>{
      if(result.status == HttpStatusCode.Ok)
      {
        alert("Succesfuly enter by: " + this.state.email);
      }
      else{
       alert(result.data);
      }
    }).catch((error) =>{
       alert("Error: ${request.status} ${request.statusText} ${error}");
    })
  }

  render(){
    return (      
      <div className="SignUp">
      <form className="SignUp__Auth-form">
        <div className="SignUp__SubContainer">
          <h3 className="SignUp__Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Robert"
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Martin"
            />
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Uncle Bob"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="radio-btn-container" style={{ display: "flex" }}>				
					<RadioButton 
						changed={ this.radioChangeHandler } 
						id="1" 
						isSelected={ this.state.paymentMethod === "Teacher" } 
						label="Teacher" 
						value="Teacher" 
					/>
					<RadioButton 
						changed={ this.radioChangeHandler } 
						id="2" 
						isSelected={ this.state.paymentMethod === "Dispacher" } 
						label="Dispacher" 
						value="Dispacher" 
					/>
          <RadioButton 
						changed={ this.radioChangeHandler } 
						id="3" 
						isSelected={ this.state.paymentMethod === "Employee" } 
						label="Employee" 
						value="Employee" 
					/>         
				</div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </div>
      </form>
      </div>
    )
  }
}