import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthForm from '../components/AuthForm';
import {Redirect} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import * as actions from '../store/actions';

class SignUp extends React.Component{

    constructor(props){
        super(props);
        this.url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDk4JksCFeMAzEmlX53iAdI4wGrh9sGxP4';
    }

    onSubmit=(email,password)=>{
        this.props.onAuth(email,password,this.url);
    }
    
    render(){
        const {isAuthenticated, loading,error} = this.props;
        if(isAuthenticated){
            return(
                <Redirect to="/" />
            );
        }
        if(loading){
            return(
                <Spinner />
            );
        }
        return(
            <div className="form_container">
            <h2>Sign up</h2>
            <div className="error">{error}</div>
            <AuthForm onSubmit = {this.onSubmit} buttonName={"sign up"}/>
            <Link to="/signin" replace>sign in</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);