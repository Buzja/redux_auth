import axios from 'axios';

export const authStart = () => {
    return{
        type: 'AUTH_START'
    }
};

export const authSuccess = (token, userId,userEmail) => {
    return{
        type: 'AUTH_SUCCESS',
        idToken: token,
        userId: userId,
        userEmail: userEmail
    }
};

export const authFail = (error) => {
    return{
        type : 'AUTH_FAIL',
        error : error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    return {
        type: 'LOGOUT'
    }
}

export const onAuth = (email,password,url) =>{
    
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post(url,authData)
      .then((res)=>{
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('userEmail', res.data.email);
        dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email));
      })
      .catch((err)=>{
        dispatch(authFail(err.response.data.error.message));
      });
        
    }
}

export const authCheckState = () =>{
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
           // dispatch(logout());
        }
        else{
            //const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const userId = localStorage.getItem('userId');
            const userEmail = localStorage.getItem('userEmail');
            dispatch(authSuccess(token,userId,userEmail));
        }
    }
}