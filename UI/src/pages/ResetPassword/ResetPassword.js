import React, {createRef} from 'react';
import '../SignIn/SignIn.scss'
import AuthServices from '../../services/AuthServices';
import { Navigate } from "react-router-dom";
import ErrorHandler from '../../modules/ErrorHandler';

const authSevice = new AuthServices();
const errorHandler = new ErrorHandler();
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";
const Password_Regex = "^(?=.*[_+-/?:;№!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Zа-яА-Я])(?=.*[0-9]).{6,}$";

export default class ResetPassword extends React.Component {

  constructor(props) {
      super(props);
      this.state = {    
        Email: "",   
        EmailValid: false,  
        EmailFocus: false,
  
        Password: "",      
        PasswordValid: false,
        PasswordFocus: false,
        Redirect: false,
      }
      this.handleValues = this.handleValues.bind(this);   
      this.handleSubmit = this.handleSubmit.bind(this);
      this.ref = createRef();
      this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();    
      const data = {
        Email: this.state.Email,
        Password: this.state.Password,
      };
      authSevice.ResetPassword(data).then((data) =>{
        if(data.status === 200)
        {
          console.log("Succesfuly reset password by: " + data.data.Email);   
          console.log(data);    
          alert("Password successfuly reset")   
        }
        else{
          console.log(data);       
        }
      }).catch(errorHandler.httpErrorHandler) 
    }

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

  handleBlur = (event) => {
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
      case 'Email':
        if (value1 === ""){
          this.setState({EmailFocus: value2})          
        }
        else{
        this.setState({
          EmailValid: value1,
          EmailFocus: value2
        })}
        break;
      case 'Password':
        if (value1 === ""){
          this.setState({PasswordFocus: value2})          
        }
        else{
        this.setState({
          PasswordValid: value1,
          PasswordFocus: value2
        })}
        break;
      default:
        console.log("Somthing goes wrong in setField");      
        break;
    }
  }

render(){
  console.log('Reset_State: ', this.state) 
    return (
      <div className="SignIn">
        {this.state.Redirect && (
          <Navigate to="/" replace={true} />
        )}
        <form className="SignIn__Auth-form" onSubmit={this.handleSubmit}>
          <div className="SignIn__Sub-Container">
            <h3 className="SignIn__Auth-form-title">Reset Password</h3>            
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                checked={this.state.EmailValid}
                type="email"
                name='Email'
                className="form-control mt-1"
                placeholder="Enter email"
                value={this.state.Email}
                pattern={Email_Regex}    
                ref={this.ref}          
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
                type="password"
                name='Password'
                className="form-control mt-1"
                placeholder="Enter password"
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
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
