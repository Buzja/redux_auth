import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import ImageFile from '../components/ImageFile';
import Input from '../components/Input';
import './CloudStorage.css';
import * as actions from '../store/actions';
import Spinner from '../components/Spinner/Spinner';

const config = {
  apiKey: "AIzaSyDk4JksCFeMAzEmlX53iAdI4wGrh9sGxP4",
  authDomain: "test-67f1c.firebaseapp.com",
  databaseURL: "https://test-67f1c.firebaseio.com",
  projectId: "test-67f1c",
  storageBucket: "test-67f1c.appspot.com",
  messagingSenderId: "838573815134"
};
firebase.initializeApp(config);
const storage = firebase.storage();
const database = firebase.database();

class CloudStorage extends Component {

  state={
    loadingpage: true
  }
  
  dbPath = `${this.props.userId}/files`;

  uploadFiles = selectedFiles =>{
    for(let i=0;i<selectedFiles.length;i++){
      const uploadFile = selectedFiles[i];   
      const filesFromStore = this.props.files;
  
      for(let file of filesFromStore){
        if(file.name === uploadFile.name){
          console.log("Thats file currently Exist!");
          return;
        }
      }
      
      this.props.onUpload(database,storage,this.dbPath,uploadFile);
    }
  }

  componentDidMount=()=>{
   setTimeout(() => {
     this.setState({
       loadingpage: false
     })
   }, 1500);
    this.props.subscribeOnAdd(database,this.dbPath);
    this.props.subscribeOnDelete(database,this.dbPath);
  }

  deleteFile=(file)=>{
    this.props.onDelete(database,storage,file,this.dbPath);
  }

  downloadFile=(url,name)=>{
    this.props.onDownloadFile(url,name)
  }

  render() {
    const {deleting,downloading,uploading} = this.props;
    const {loadingpage} = this.state;
    const spinner = loadingpage || deleting|| uploading||downloading?<Spinner />:null;
    const files = this.props.files.map(file=>(
      <ImageFile key={file.id}
       downloadUrl={file.downloadUrl} 
       name={file.name}
        type={file.type} 
        onDownload={()=>this.downloadFile(file.downloadUrl,file.name)} 
        onDelete={()=>this.deleteFile(file)}/>
    ));

    return (
      
      <div className="App">
        {spinner}
        <div className="head_sec">
          <Input onClick={this.uploadFiles}/>
          <div className="user_data">
          <div className="user_email"><span>user:</span>{this.props.email}</div>
          <Link to="/logout" replace>logout</Link>
          </div>
        </div>
        <div className="files_wrapper">         
          {files}
        </div>
      </div>     
    )
  }
}

const mapStateToProps = state =>{
  return{
    email: state.userEmail,
    token: state.token,
    userId: state.userId,
    files: state.files,
    downloading: state.downloading,
    uploading: state.uploading,
    deleting: state.deleting
  }
}

const  mapDispatchToProps = dispatch =>{
  return{
    onUpload: (database,storage,dbPath,uploadFile)=>dispatch(actions.onUploadFiles(database,storage,dbPath,uploadFile)),
    onDelete: (database,storage,file,dbPath)=>dispatch(actions.deleteFile(database,storage,file,dbPath)),
    subscribeOnDelete: (database,dbPath)=>dispatch(actions.subscribeOnDelete(database,dbPath)),
    subscribeOnAdd: (database,dbPath)=>dispatch(actions.subscribeOnAdd(database,dbPath)),
    onDownloadFile: (url,name)=>dispatch(actions.onDownloadFile(url,name))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CloudStorage);