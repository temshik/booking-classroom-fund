import React, {createRef} from 'react';
import '../SignIn/SignIn.scss'
import AuthServices from '../../services/AuthServices';

const authSevice = new AuthServices();

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

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
        };
        authSevice.ResetPassword(data).then((data) =>{
          if(data.status == 200)
          {
            console.log("Succesfuly reset password by: " + data.data.Email);   
            console.log(data);    
            alert("Password successfuly reset")   
          }
          else{
            console.log(data);       
          }
        }).catch((error) =>{
           console.log("Error: "+error);
        });
      }

render(){
    return (
      <div className="SignIn">
        <form className="SignIn__Auth-form" onSubmit={this.handleSubmit}>
          <div className="SignIn__Sub-Container">
            <h3 className="SignIn__Auth-form-title">Reset Password</h3>            
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
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}