import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthForm from '../components/AuthForm';
import {Redirect} from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
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
        const {isAuthenticated, loading,error} = this.props;
        if(isAuthenticated){
            return(
                <Redirect to="/" push={false}/>
            );
        }
        if(loading){
            return(
                <Spinner />
            );
        }
        return(
            <div className="form_container">
            <h2>Sign in</h2>
            <div className="error">{error}</div>
            <AuthForm onSubmit = {this.onSubmit} buttonName={"sign in"}/>
            <Link to="/signup" replace>sign up</Link>
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