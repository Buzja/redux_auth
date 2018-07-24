import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import CloudStorage from './containers/CloudStorage';
import * as actions from './store/actions';
import Logout from './containers/Logout';



class App extends Component {

  componentDidMount = () =>{
    console.log(`token ${this.props.isAuthenticated}`);
    
    this.props.onAutoTryAuth();
  }

  render() {    
    let routes = (
      <Switch>
        <Route path='/' exact render={()=>(this.props.isAuthenticated === true ? <CloudStorage/> : <Redirect to="/signin"/>)} />
        <Route  path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/logout' component={Logout}/>
      </Switch>
    );

    return (
      <div className="App">
      <BrowserRouter>
       {routes}
       </BrowserRouter>
      </div>
    );
  }
}

const mapStateProps = state=>{
  return{
    isAuthenticated: state.token !== null
  };
};

const mapDispatchProps = dispatch =>{
  return {
    onAutoTryAuth: ()=> dispatch(actions.authCheckState())
  }
}

export default connect(mapStateProps,mapDispatchProps)(App);
