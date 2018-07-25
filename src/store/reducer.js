const initialState = {
    token: null,
    userEmail:null,
    userId: null,
    error: null,
    loading: false,
    uploading:false,
    files: []
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
        case 'UPLOADING_START' :
            return updateObject(state,{
                uploading: true
            })
        case 'UPLOADING_FAILED': 
            return updateObject(state,{
                uploadError: action.error,
                uploading: false
            })
        case 'UPLOADING_SUCCESS': 
            return updateObject(state,{
                uploading: false
            })
        case 'DELETE_START' :
            return updateObject(state,{
                deleting: true
            })
        case 'DELETE_FAILED': 
            return updateObject(state,{
                deleteError: action.error,
                deleting: false
            })
        case 'DELETE_SUCCESS': {
            const files = state.files.filter(file=>file.id !== action.fileId);
            return updateObject(state,{
                deleting: false,
                files: files
            })
        }
        case 'ADD_FILE':{
            return updateObject(state,{
                files: state.files.concat(action.file)
            })
        }
            
        default:  return state;
    }
}

export default reducer;