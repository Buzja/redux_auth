import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import { bindActionCreators } from '../../node_modules/redux';

class Logout extends Component {

    componentDidMount=()=>{
        this.props.onLogout.logout();
    }

    render(){
        return <Redirect to="/"/>;
    }
}

const mapDispatchProps = dispatch =>{
  return {
    // onLogout: ()=>dispatch(actions.logout)
    onLogout: bindActionCreators(actions,dispatch)
  }
}

export default connect(null,mapDispatchProps)(Logout)