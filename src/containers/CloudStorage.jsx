import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class CloudStorage extends Component {

  render() {
    return (
      <div>
        Hello!!! U on home page!!!
        <Link to="/logout">logout</Link>
      </div>
      
    )
  }
}


export default CloudStorage;