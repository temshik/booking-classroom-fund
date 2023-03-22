import React, {createRef} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import AuthServices from '../../services/AuthServices';
import store from '../../redux/store';
import {REMOVE_ACTIVE_USER}  from '../../redux/slice/authSlice';
import {toast} from 'react-toastify';
import ErrorHandler from '../../modules/ErrorHandler';
import {confirm} from '../../modules/confirmService/Confirm';
import '../SignIn/SignIn.scss'

const authSevice = new AuthServices();
const errorHandler = new ErrorHandler();
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";
const Password_Regex = "^(?=.*[_+-/?:;№!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Zа-яА-Я])(?=.*[0-9]).{6,}$";

export default class DeleteUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {    
          Email: "",   
          EmailValid: false,  
          EmailFocus: false,
    
          Password: "",      
          PasswordValid: false,
          PasswordFocus: false,
          PasswordShow: false,
          Redirect: false,
        }
        this.handleValues = this.handleValues.bind(this);   
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.ref = createRef();
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleResult(data) {        
        authSevice.DeleteUser({data}).then((data) =>{            
        if(data.status === 200)
        {            
            if(window.sessionStorage.getItem('email') === this.state.Email){
                store.dispatch(REMOVE_ACTIVE_USER());
            }                  
            toast.success("User successfuly deleted", {
            position: toast.POSITION.TOP_CENTER
            });
            this.setState({Password: ''});
            this.setState({Redirect: true});
        }
        else {
            console.log(data);       
        }}).catch(errorHandler.httpErrorHandler);          
    }

    async handleSubmit(e) {
        e.preventDefault();    
        const data = {
            email: this.state.Email,
            password: this.state.Password,
        };      
        if (await confirm("Are your sure?")) {   
            this.handleResult(data)
        }
    }    
    
    handleValues(event) {
        const {name, value} = event.target
        const newValueIsValid = !event.target.validity.patternMismatch;
        if (event.target.checked) {
            if (newValueIsValid) {
                this.setField(event.target.name, false, false); 
            }
        }
        this.setState({[name]:value});
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
                alert("Somthing goes wrong in setField");      
            break;
        }
    }    
    
    render(){
        return (
          <div className="SignIn">
            {this.state.Redirect && (
              window.location.reload()
            )}
            <form className="SignIn__Auth-form" onSubmit={this.handleSubmit}>
              <div className="SignIn__Sub-Container">
                <h3 className="SignIn__Auth-form-title">Delete User</h3>      
                <div className="text-center">                    
                    <span className="link-primary">
                        <Link to='/' style={{ color: '#14A44D' }}>Home page</Link>
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
                  <label>New password</label>
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
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-outline-success">
                    Delete
                  </button>
                </div>
              </div>
            </form>
          </div>
        )
    }
}
