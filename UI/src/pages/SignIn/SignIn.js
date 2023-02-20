import React, {createRef} from 'react';
import { Navigate, Link } from "react-router-dom";
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import store from '../../redux/store';
import { ToastContainer } from 'react-toastify';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import 'react-toastify/dist/ReactToastify.css';
import AuthServices from '../../services/AuthServices';
import ErrorHandler from '../../modules/ErrorHandler';
import './SignIn.scss'

const authSevice = new AuthServices();
const errorHandler = new ErrorHandler();
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";
const Password_Regex = "^(?=.*[_+-/?:;№!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Zа-яА-Я])(?=.*[0-9]).{6,}$";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {          
      Email: "",   
      EmailValid: false,  
      EmailFocus: false,

      Password: "",      
      PasswordValid: false,
      PasswordFocus: false,
      PasswordShow:false,

      Redirect: false,
      Checked: false
    }   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValues = this.handleValues.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.ref = createRef();
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();    
    const data = {
      Email: this.state.Email,
      Password: this.state.Password,
      RememberMe: this.state.Checked,
      ReturnUrl: "string"
    };
    authSevice.SignIn(data).then((data) =>{
      console.log(data.data);  
      if(data.status === 200)
      { 
        console.log(JSON.stringify(data.data.accessToken)); 
        console.log(JSON.stringify(data.data.refreshToken)); 
        console.log(JSON.stringify(data.data.tokenLifeTimeInMinutes)); 

        store.dispatch(SET_ACTIVE_USER({          
          email: this.state.Email,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          tokenLifeTimeInMinutes: data.data.tokenLifeTimeInMinutes,
          RememberMe: this.state.Checked,
          ReturnUrl: "string"          
        }))

        alert("Succesfuly Loged in");
        this.setState({Redirect: true});     
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

  handleCheckboxChange(event) {
    this.setState({Checked: event.target.checked});
    console.log(this.state.Checked);
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
    return (
      <div className="SignIn">
        {this.state.Redirect && (
          <Navigate to="/" replace={true}/>
        )}
        <form className="SignIn__Auth-form" onSubmit={this.handleSubmit}>
          <div className="SignIn__Sub-Container">
            <h3 className="SignIn__Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary">
              <Link to='/SignUp' style={{ color: '#14A44D' }}>Sign Up</Link>
              </span>
            </div>
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
              <div className="input-group">
              <input                
                checked={this.state.PasswordValid}
                type={this.state.PasswordShow ? "text" : "password"}
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
              <div className="input-group-btn" style={{width:"30px", height:"38px", marginTop:"4px", border:"1px solid black", borderTopRightRadius:"5px", borderBottomRightRadius:"5px", alignItems:'center', justifyContent:"center", display:'flex'}}>
                <FontAwesomeIcon  onClick={() => this.setState({PasswordShow: !this.state.PasswordShow})} style={{color:'black'}} icon={this.state.PasswordShow ? faEye : faEyeSlash}/>
              </div>
              </div>
              {this.state.PasswordFocus && (
                <p role="alert" style={{ color: "rgb(255, 0, 0)" }}>
                  Password must contain more then 6 elements and include at least 1 lower case and 1 upper case letter, 1 numeric value and 1 special character!
                </p>
              )}
            </div>
            <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input 
                          type="checkbox"
                          className="custom-control-input" 
                          id="customCheck1" 
                          checked={this.state.Checked}
                          onChange={this.handleCheckboxChange}
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-outline-success">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <Link to='/ResetPassword' style={{ color: '#14A44D' }}>password?</Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
  }
}
