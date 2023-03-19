import React, {createRef} from 'react';
import {Navigate} from "react-router-dom";
import AuthServices from '../../services/AuthServices';
import {toast} from 'react-toastify';
import ErrorHandler from '../../modules/ErrorHandler';

const authSevice = new AuthServices();
const errorHandler = new ErrorHandler();
const Name_Regex = "[a-zA-Z][a-zA-Z0-9-_]{3,23}$";
const Email_Regex = "(?:[a-zA-Z0-9]+\.)+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$";

export default class EditAccount extends React.Component{
    constructor(props) {
        super(props);
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

            Redirect: false
        }
        this.handleValues = this.handleValues.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.ref = createRef();
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleUpdate(event) {
        event.preventDefault();
        const data = {
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email,          
        };
        authSevice.EditAccount(data).then((data) =>{
          if(data.status === 200)
          {
            toast.success("User Account successfuly updated", {
              position: toast.POSITION.TOP_CENTER
            }); 
            console.log(data);
            this.setState({Redirect: true});
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
            break;
          case 'LastName':
            if (value1 === ""){
              this.setState({LastNameFocus: value2})          
            }
            else{
            this.setState({
              LastNameValid: value1,
              LastNameFocus: value2
            })}
            break;          
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
          default:
            console.log("Somthing goes wrong in setField");
            break;  
        }
    }

render(){    
    return (     
    <div className="SignUp">
        {this.state.Redirect && (
            <Navigate to="/" replace={true} />
        )}
        <form className="SignUp__Auth-form" onSubmit={this.handleUpdate}>
        <div className="SignUp__SubContainer">
            <h3 className="SignUp__Auth-form-title">Edit Account</h3>            
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
            <label>The email address of the edited account</label>
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
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-outline-success" disabled={this.state.ErrorMessage}>
                Update
            </button>
            </div>
        </div>
        </form>
    </div>)}
}