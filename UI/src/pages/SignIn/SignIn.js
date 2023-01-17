import React, {createRef} from 'react';
import './SignIn.scss'
import '../SignUp/SignUp.scss'
import RadioButton from "../../components/RadioButton/RadioButton";
import AuthServices from '../../services/AuthServices';
import { Navigate, Link } from "react-router-dom";

const authSevice = new AuthServices();
const Name_Regex = "[a-zA-Z][a-zA-Z0-9-_]{3,23}$";
const User_Regex = "[a-zA-Z][a-zA-Z0-9-_][a-zA-Z ,.'-]{3,23}$";
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";
const Password_Regex = "^(?=.*[_+-/?:;№!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Zа-яА-Я])(?=.*[0-9]).{6,}$";

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authMode: "signin"};
    this.state = {    
      FirstName: "",  
      FirstNameValid: false,
      FirstNameFocus: false,

      LastName: "",     
      LastNameValid: false,
      LastNameFocus: false,

      UserName: "",    
      UserNameValid: false,
      UserNameFocus: false,

      Email: "",   
      EmailValid: false,  
      EmailFocus: false,

      Password: "",      
      PasswordValid: false,
      PasswordFocus: false,

      ConfirmPassword: "",
      ConfirmPasswordValid: false,
      ConfirmPasswordFocus: false,

      RoleValue: "Teacher",
      Redirect: false,
    }
    this.changeAuthMode = this.changeAuthMode.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValues = this.handleValues.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.ref = createRef();
    this.handleBlur = this.handleBlur.bind(this);
  }


  changeAuthMode(){
    let authMode = (this.state.authMode === "signin") ? "signup" : "signin";
    this.setState({authMode: authMode});
  }
//SignIn
  handleEmailChange(e){
    var value = e.target.value;
    this.setState({Email: value});
  }

  handlePasswordChange(e){
    var value = e.target.value;
    this.setState({Password: value});
  }

  handleSubmit(e) {
    e.preventDefault();    
    const data = {
      Email: this.state.Email,
      Password: this.state.Password,
      RememberMe: true,
      ReturnUrl: "string"
    };
    authSevice.SignIn(data).then((data) =>{
      if(data.status == 200)
      {
        alert("Succesfuly enter by: " + data.data.Email);   
        console.log(data);       
        this.setState({Redirect: true});
      }
      else{
        console.log(data);       
      }
    }).catch((error) =>{
       console.log("Error: "+error);
    });
  }
//SignUp
  handleValues(event) {
    const {name, value} = event.target
    const newValueIsValid = !event.target.validity.patternMismatch;
    if (event.target.checked) {
      if (newValueIsValid) {
        this.setField(event.target.name, false, false); 
      }
    }
    this.setState({[name]:value},
      console.log('name', name, 'value', value)
    );
  }

	radioChangeHandler = (event) => {
		this.setState({RoleValue: event.target.value});
	}

  handleBlur = (event) =>{
    if(!event.target.checked) {
      if (event.target.validity.patternMismatch) {
        this.ref.current.focus();
        this.setField(event.target.name, true, true); 
      }
    }
    if(event.target.checked) {
      this.setField(event.target.name, "", false)    
    }
  }

  handleFocus = (event) =>{     
    if(event.target.checked){
        this.setField(event.target.name, "", true)
    }
  }

  style(error) {
    if (error) {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)" 
      };
    }
  }

  setField(name, value1, value2) {
    switch(name) {
      case 'FirstName':
        if (value1 === ""){
          this.setState({FirstNameFocus: value2})          
        }
        else{
        this.setState({       
          FirstNameValid: value1,
          FirstNameFocus: value2,     
        })}
      case 'LastName':
        if (value1 === ""){
          this.setState({LastNameFocus: value2})          
        }
        else{
        this.setState({
          LastNameValid: value1,
          LastNameFocus: value2
        })}
      case 'UserName':
        if (value1 === ""){
          this.setState({UserNameFocus: value2})          
        }
        else{
        this.setState({
          UserNameValid: value1,
          UserNameFocus: value2
        })}
      case 'Email':
        if (value1 === ""){
          this.setState({EmailFocus: value2})          
        }
        else{
        this.setState({
          EmailValid: value1,
          EmailFocus: value2
        })}
      case 'Password':
        if (value1 === ""){
          this.setState({PasswordFocus: value2})          
        }
        else{
        this.setState({
          PasswordValid: value1,
          PasswordFocus: value2
        })}
      case 'ConfirmPassword':
        if (value1 === ""){
          this.setState({ConfirmPasswordFocus: value2})          
        }
        else{
        this.setState({
          ConfirmPasswordValid: value1,
          ConfirmPasswordFocus: value2
        })}
    }
  }

  handleRegister(event) {
    event.preventDefault();
    const data = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      UserName: this.state.UserName,
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmedPassword: this.state.ConfirmPassword,
    };
    authSevice.SignUp(data,this.state.RoleValue).then((data) =>{
      if(data.status == 201)
      {
        alert("Succesfuly register");
        console.log(data);
      }
      else{
       console.log(data);
      }
    }).catch((error) =>{
       console.log("Error: ${request.status} ${request.statusText} ${error}");
    });
  }

render(){
  console.log('State: ', this.state)  
  if (this.state.authMode === "signin") {
    return (
      <div className="SignIn">
        {this.state.Redirect && (
          <Navigate to="/" replace={true} />
        )}
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
                value={this.state.Email}
                onChange={this.handleEmailChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={this.state.Password}
                onChange={this.handlePasswordChange}
                required
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
              Forgot<Link to='/ResetPassword'> <a href="#">password?</a></Link>
            </p>
          </div>
        </form>
      </div>
    )
  }
  
  return (     
    <div className="SignUp">
      <form className="SignUp__Auth-form" onSubmit={this.handleRegister}>
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
              type="text"
              name='FirstName'
              checked={this.state.FirstNameValid}
              className="form-control mt-1"
              placeholder="Robert"
              value={this.state.FirstName}
              pattern={Name_Regex}
              ref={this.ref}
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.FirstNameValid)}              
              required          
            />
            {this.state.FirstNameFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                First Name should be 4-16 characters and shouldn't include any special character!
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              name='LastName'
              checked={this.state.LastNameValid}
              className="form-control mt-1"
              placeholder="Martin"
              value={this.state.LastName}
              pattern={Name_Regex}
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.LastNameValid)}
              required            
            />
            {this.state.LastNameFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                Last Name should be 4-16 characters and shouldn't include any special character!
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input                         
              type="text"
              name='UserName'
              checked={this.state.UserNameValid}
              className="form-control mt-1"
              placeholder="Cecil"
              value={this.state.UserName}
              pattern={User_Regex}              
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.UserNameValid)}   
              required          
            />
            {this.state.UserNameFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                User Name should be 4-16 characters and shouldn't include any special character!
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              checked={this.state.EmailValid}
              type="email"
              name='Email'
              className="form-control mt-1"
              placeholder="Email Address"
              value={this.state.Email}
              pattern={Email_Regex}              
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.EmailValid)}       
              required          
            />
            {this.state.EmailFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                It should be a valid email address!
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              checked={this.state.PasswordValid}
              type="password"
              name='Password'
              className="form-control mt-1"
              placeholder="Password"
              value={this.state.Password}
              pattern={Password_Regex}              
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.PasswordValid)}          
              required      
            />
            {this.state.PasswordFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                Password must contain more then 6 elements and include at least 1 lower case and 1 upper case letter, 1 numeric value and 1 special character!
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              checked={this.state.ConfirmPasswordValid}
              type="password"
              name='ConfirmPassword'
              className="form-control mt-1"
              placeholder="Password"
              value={this.state.ConfirmPassword}
              pattern={this.state.Password}              
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.ConfirmPasswordValid)}            
              required    
            />
            {this.state.ConfirmPasswordFocus && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                Password don't match!
              </p>
            )}
          </div>
          <div className="radio-btn-container" style={{ display: "flex" }}>				
					<RadioButton 
						changed={ this.radioChangeHandler } 
						id="1" 
						isSelected={ this.state.RoleValue === "Teacher" } 
						label="Teacher" 
						value="Teacher" 
					/>
					<RadioButton 
						changed={ this.radioChangeHandler } 
						id="2" 
						isSelected={ this.state.RoleValue === "Dispacher" } 
						label="Dispacher" 
						value="Dispacher" 
					/>
          <RadioButton 
						changed={ this.radioChangeHandler } 
						id="3" 
						isSelected={ this.state.RoleValue === "Employee" } 
						label="Employee" 
						value="Employee" 
					/>         
				</div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" disabled={this.state.ErrorMessage}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
}
