import React from 'react';
import './SignUp.scss'

export default class SignUp extends React.Component{
  render(){
    return (
      <div className="SignUp">
      <form className="SignUp__Auth-form">
        <div className="SignUp__SubContainer">
          <h3 className="SignUp__Auth-form-title">Sign Up</h3>
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
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Register
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
}