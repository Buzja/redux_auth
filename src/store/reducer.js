const initialState = {
    token: null,
    userEmail:null,
    userId: null,
    error: null,
    loading: false,
}

const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

const reducer=(state = initialState ,action)=>{
    switch(action.type){
        case 'AUTH_START': {
            return updateObject( state, { error: null, loading: true } );
        } 
        case 'AUTH_SUCCESS': {
            return updateObject( state, { 
                token: action.idToken,
                userId: action.userId,
                userEmail: action.userEmail,
                error: null,
                loading: false
             } );
        } 
        case 'AUTH_FAIL': {
            return updateObject( state, {
                error: action.error,
                loading: false
            });
        } 
        case 'LOGOUT' : 
            return {
                ...initialState,                
            }
        default:  return state;
    }
}

export default reducer;