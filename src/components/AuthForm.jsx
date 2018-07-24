import React, { Component } from 'react';
import '../components/AuthForm.css'

export default class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : '',
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  
  render() {
    return (
      <form className="authForm" onSubmit={(e)=>{
        e.preventDefault();
        this.props.onSubmit(this.state.email,this.state.password);}}>
        <input id="email" name="email" placeholder="email" onChange={this.onChange} value={this.state.email} type="email"/>
        <input id="password" name="password" placeholder="password" onChange={this.onChange} value={this.state.password} type="password"/>
        <button className="submit_btn">{this.props.buttonName}</button>
      </form>
    )
  }
}

