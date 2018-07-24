import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthForm from '../components/AuthForm';
import {Redirect} from 'react-router-dom';
import * as actions from '../store/actions';

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDk4JksCFeMAzEmlX53iAdI4wGrh9sGxP4';
    }

    onSubmit=(email,password)=>{
           this.props.onAuth(email,password,this.url);
    }

    render(){
        if(this.props.isAuthenticated){
            return(
                <Redirect to="/" />
            );
        }
        return(
            <div className="form_container">
            <AuthForm onSubmit = {this.onSubmit} buttonName={"sign in"}/>
            <Link to="/signup">sign up</Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
    };
};

const mapDispatchToProps=dispatch=>{
    return {
        onAuth: (email,password,url) => dispatch(actions.onAuth(email,password,url))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);