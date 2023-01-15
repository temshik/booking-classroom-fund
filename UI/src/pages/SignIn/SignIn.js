import React  from 'react';
import './SignIn.scss'
import '../SignUp/SignUp.scss'
import RadioButton from "../../components/RadioButton/RadioButton";
import axios, { HttpStatusCode } from "axios";

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authMode: "signin"};
    this.state = {email: ""};
    this.state = {password: ""};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.changeAuthMode = this.changeAuthMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeAuthMode(){
    let authMode = (this.state.authMode === "signin") ? "signup" : "signin";
    this.setState({authMode: authMode});
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
      Password: this.state.password
    };
    const url = 'http://localhost:5000/Authorization/Authorize';
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
      if(result.data == HttpStatusCode.Ok)
      {
        alert("Succesfuly enter by: " + this.state.email);
      }
      else{
       alert(result.data);
      }
    }).catch((error) =>{
       alert(error);
    })
  }

	state = {
		paymentMethod: "COD"
	}

	radioChangeHandler = (event) => {
		this.setState({
			paymentMethod: event.target.value
		});
    console.log(event.target.value);
	}

render(){
  if (this.state.authMode === "signin") {
    return (
      <div className="SignIn">
        <form className="SignIn__Auth-form" onSubmit={this.handleSubmit}>
          <div className="SignIn__Sub-Container">
            <h3 className="SignIn__Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={this.changeAuthMode}>
              <a href="#">Sign Up</a>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }
  
  return (
    <div className="SignUp">
      <form className="SignUp__Auth-form">
        <div className="SignUp__SubContainer">
          <h3 className="SignUp__Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={this.changeAuthMode}>
            <a href="#">Sign In</a>
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Robert"
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Martin"
            />
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="email"
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