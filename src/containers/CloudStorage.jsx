import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class CloudStorage extends Component {

  render() {
    return (
      <div>
        <div> email:</div>
          <h1>{this.props.email}</h1> 
        <Link to="/logout">logout</Link>
      </div>
      
    )
  }
}

const mapStateToProps = state =>{
  return{
    email: state.userEmail,
    token: state.token
  }
}


export default connect(mapStateToProps)(CloudStorage);