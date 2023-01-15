import React  from 'react';
import './SignIn.scss'
import '../SignUp/SignUp.scss'
import RadioButton from "../../components/RadioButton/RadioButton";
import FormErrors from '../../components/FormErrors/FormErrors'
import HttpStatusCode  from "axios";
import AuthServices from '../../services/AuthServices';

const authSevice = new AuthServices();

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
      LastName: "",     
      UserName: "",     
      Email: "",     
      Password: "",          
      ConfirmPassword: "",
      RoleValue: "Teacher",
      formErrors: {FirstName: '', LastName: '', UserName: "", Email: "", Password: "", ConfirmPassword: ""},
      FirstNameValid: false,
      LastNameValid: false,
      UserNameValid: false,
      EmailValid: false,
      PasswordValid: false,
      ConfirmPasswordValid: false
    }
    this.changeAuthMode = this.changeAuthMode.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValues = this.handleValues.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.errorClass = this.errorClass.bind(this);
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
    this.setState({[name]:value},
      () => { this.validateField(name, value) },
      console.log('name', name, 'value', value));
  }
	radioChangeHandler = (event) => {
		this.setState({
			RoleValue: event.target.value
		});
    console.log(event.target.value);
	}

  validateField(fieldName, value) {
    console.log('CheckValidity Calling')
    let fieldValidationErrors = this.state.formErrors;
    let FirstNameValid = this.state.FirstNameValid;
    let LastNameValid = this.state.LastNameValid;
    let UserNameValid = this.state.UserNameValid;
    let EmailValid = this.state.EmailValid;
    let PasswordValid = this.state.PasswordValid;
    let ConfirmPasswordValid = this.state.ConfirmPasswordValid;
    
    switch(fieldName) {
      case 'Email':
        EmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.Email = EmailValid ? '' : ' is invalid';
        break;
      case 'Password':
        PasswordValid = value.length >= 6;
        fieldValidationErrors.Password = PasswordValid ? '': ' is too short';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    EmailValid: EmailValid,
                    PasswordValid: PasswordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid &&
                              this.state.passwordValid});
  }

  handleRegister(event) {
    this.cheackfunction()
    event.preventDefault();
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
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
              //error={this.state.FirstNameValid}
              type="text"
              name='FirstName'
              className="form-control mt-1"
              placeholder="Robert"
              value={this.state.FirstName}
              onChange={this.handleValues}
              required                      
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              //error={this.state.LastNameValid}
              type="text"
              name='LastName'
              className="form-control mt-1"
              placeholder="Martin"
              value={this.state.LastName}
              onChange={this.handleValues}  
              required            
            />
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              //error={this.state.UserNameValid}            
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
              //error={this.state.EmailValid}
              type="email"
              name='Email'
              className="form-control mt-1 is-valid is-invalid"
              placeholder="Email Address"
              value={this.state.Email}
              onChange={this.handleValues}    
              //required          
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