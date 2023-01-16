import React, {createRef} from 'react';
import './SignIn.scss'
import '../SignUp/SignUp.scss'
import RadioButton from "../../components/RadioButton/RadioButton";
import HttpStatusCode  from "axios";
import AuthServices from '../../services/AuthServices';

const authSevice = new AuthServices();
const Name_Regex = "[a-zA-Z][a-zA-Z0-9-_]{3,23}$";
const Email_Regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
const Password_Regex = /^(?=.*[a-z])(?=.[A-Z])(?=.*[0-9])(?=.*[!@#$%/_]).{6,24}$/;

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {authMode: "signin"};
    this.state = {
      email: "",
      password: ""
    };
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
      ErrorMessage: false,
      ShowErrorMessage: false,
      Success: true
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
    authSevice.SignIn(data).then((data) =>{
      if(data.status == HttpStatusCode.Ok)
      {
        console.log("Succesfuly enter by: " + data);
      }
      else{
       console.log(data);
      }
    }).catch((error) =>{
       console.log("Error: ${request.status} ${request.statusText} ${error}");
    });
  }
//SignUp
  handleValues(event) {
    const {name, value} = event.target
    const newValueIsValid = !event.target.validity.patternMismatch;
    if (this.state.ErrorMessage) {
      if (newValueIsValid) {
        this.setState({
          ErrorMessage: false,
          ShowErrorMessage: false
        });
      }
    }
    this.setState({[name]:value},
      //() => { this.validateField(name, value) },
      console.log('name', name, 'value', value));
  }
	radioChangeHandler = (event) => {
		this.setState({RoleValue: event.target.value});
    console.log(event.target.value);
	}

  handleBlur = (event) =>{
    if(!this.state.ErrorMessage) {
      if (event.target.validity.patternMismatch) {
        this.ref.current.focus();
        this.setState({
          ErrorMessage: true,
          ShowErrorMessage: true
        })      
      }
    }
    if(this.state.ErrorMessage) {
      this.setState({ShowErrorMessage: false})    
    }
  }

  handleFocus = () =>{
    if(this.state.ErrorMessage){
        this.setState({ShowErrorMessage: true})
    }
  }

  style(error) {
    if (error) {
      return {
        backgroundColor: "rgba(255, 0, 0, 0.5)" 
        // Or any other style you prefer
      };
    }
  }

   validateField() {
    this.setState({
      FirstNameValid: false,
      LastNameValid: false,
      UserNameValid: false,
      EmailValid: false,  
      PasswordValid: false,
      ConfirmPasswordValid: false,
      Success: false
    })
      if(Name_Regex.test(this.state.FirstName))
      {
        this.setState({FirstNameValid: true}, this.FirstNameValid);
      }
      if(Name_Regex.test(this.state.LastName))
      {
        this.setState({LastNameValid: true}, this.LastNameValid);
      }
      if(Name_Regex.test(this.state.UserName))
      {
        this.setState({UserNameValid: true}, this.UserNameValid);
      }
      if(Email_Regex.test(this.state.Email))
      {
        this.setState({EmailValid: true}, this.EmailValid);
      }
      if(Password_Regex.test(this.state.Password))
      {
        this.setState({PasswordValid: true}, this.PasswordValid);
      }
      if(Password_Regex.test(this.state.ConfirmPassword) && 
          this.state.Password === this.state.ConfirmPassword)
      {
        this.setState({ConfirmPasswordValid: true}, this.ConfirmPasswordValid);
      }
      else
      {
        this.setState({Success: true}, this.Success);
      }
   }

  handleRegister(event) {
    this.validateField()
    event.preventDefault();
  }

render(){
  console.log('State: ', this.state)
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
                required
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
              <button type="submit" className="btn btn-primary"  disabled={!this.state.formValid}>
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
              className="form-control mt-1"
              placeholder="Robert"
              value={this.state.FirstName}
              pattern={Name_Regex}
              ref={this.ref}
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.ErrorMessage)}
              required          
            />
            {this.state.ShowErrorMessage && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                Please make sure you've entered a <em>number</em>
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              name='LastName'
              className="form-control mt-1"
              placeholder="Martin"
              value={this.state.LastName}
              pattern={Name_Regex}
              ref={this.ref}
              onBlur={this.handleBlur}
              onChange={this.handleValues}
              onFocus={this.handleFocus}
              style={this.style(this.state.ErrorMessage)}
              required            
            />
            {this.state.ShowErrorMessage && (
              <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                Please make sure you've entered a <em>Last Name</em>
              </p>
            )}
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              error={this.state.UserNameValid}            
              type="text"
              name='UserName'
              className="form-control mt-1"
              placeholder="Uncle Bob"
              value={this.state.UserName}
              onChange={this.handleValues}    
              required          
            />
          </div>
          <div className="form-group mt-3${this.errorClass(this.state.formErrors.Email)}">
            <label>Email address</label>
            <input
              error={this.state.EmailValid}
              type="email"
              name='Email'
              className="form-control mt-1 is-valid is-invalid"
              placeholder="Email Address"
              value={this.state.Email}
              onChange={this.handleValues}    
              required          
            />
             <div class="valid-feedback">
              Looks good!
            </div>
            <div className='panel panel-default'>
              <FormErrors formErrors={this.state.formErrors} /> 
            </div>    
              <div class="invalid-feedback">
                Please provide a valid city.
              </div>     
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              error={this.state.PasswordValid}
              type="password"
              name='Password'
              className="form-control mt-1"
              placeholder="Password"
              value={this.state.Password}
              onChange={this.handleValues}       
              required      
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              error={this.state.ConfirmPasswordValid}
              type="password"
              name='ConfirmPassword'
              className="form-control mt-1"
              placeholder="Password"
              value={this.state.ConfirmPassword}
              onChange={this.handleValues}          
              required    
            />
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
            <button type="submit" className="btn btn-primary" disabled={this.state.ShowErrorMessage}>
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
}