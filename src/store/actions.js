import axios from 'axios';
import fileSaver from 'file-saver'; 

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

export const uploadStarts = () =>{
    return{
        type: 'UPLOADING_START',
    }
}

export const uploadSuccess = () =>{
    return{
        type: 'UPLOADING_SUCCESS',
    }
}

export const uploadFailed = (error) =>{
    return{
        type: 'UPLOADING_FAILED',
        error: error
    }
}

export const deleteStarts=()=>{
    return{
        type:'DELETE_START'
    }
}

export const deleteFailed=(error)=>{
    return{
        type : 'DELETE_FAILED',
        error: error
    }
}

export const deleteSuccess=(fileId)=>{
    return{
        type : 'DELETE_SUCCESS',
        fileId : fileId
    }
}

export const downloadStarts = () =>{
    return{
        type: 'DOWNLOAD_START',
    }
}

export const downloadSuccess = () =>{
    return{
        type: 'DOWNLOAD_SUCCESS',
    }
}

export const downloadFailed = (error) =>{
    return{
        type: 'DOWNLOAD_FAILED',
        error: error
    }
}

export const addFile=(snap)=>{
    return {
        type: 'ADD_FILE',
        file:{
            id: snap.key,
            name: snap.val().name,
            downloadUrl: snap.val().downloadUrl,
            type: snap.val().type
        }
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

export const onUploadFiles=(database,storage,dbPath,uploadFile)=>{
    return dispatch=>{
        dispatch(uploadStarts());
        const filePath = dbPath +"/"+uploadFile.name;
        const uploadTask = storage.ref(filePath).put(uploadFile);
        uploadTask.on('state_changed', function(snapshot){
        var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
      }, function(error) {
        dispatch(uploadFailed(error));
        console.log(error);
      }, function() {
        storage.ref(filePath).getDownloadURL().then(url=>{
            dispatch(uploadSuccess());
            database.ref(dbPath).push().set({
           name: uploadFile.name,
           downloadUrl: url,
           type: uploadFile.type
           })
        })
      });
    }
}

export const deleteFile=(database,storage,file,dbPath)=>{
    return dispatch=>{
        dispatch(deleteStarts());
        storage.ref(dbPath+"/"+file.name).delete().then(()=>{
            database.ref(dbPath).child(file.id).remove();
          }).catch((err)=>{
            dispatch(deleteFailed(err));
          })
    }
}

export const subscribeOnDelete=(database,dbPath)=>{
    return dispatch=>{
    database.ref(dbPath).on('child_removed',snap=>{
        dispatch(deleteSuccess(snap.key));  
      })
    }
}

export const subscribeOnAdd = (database,dbPath)=>{
    return dispatch=>{
    database.ref(dbPath).on('child_added',snap=>{
       dispatch(addFile(snap));
      })
    }
}

export const onDownloadFile=(url,name)=>{
    return dispatch=>{
        dispatch(downloadStarts());
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';

        xhr.open('GET', url);
        xhr.onload = function() {
            if (this.status === 200) {
            var blob = xhr.response;
            fileSaver.saveAs(blob,name);
            dispatch(downloadSuccess());
            }
            else{
                dispatch(downloadFailed('Error! status: '+ this.status));
            }
        };

        xhr.send();
    }
}