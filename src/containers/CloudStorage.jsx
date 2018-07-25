import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import ImageFile from '../components/ImageFile';
import Input from '../components/Input';
import './CloudStorage.css';
import * as actions from '../store/actions';

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

  // state ={
  //   files:[]
  // }
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
    this.props.subscribeOnAdd(database,this.dbPath);
    this.props.subscribeOnDelete(database,this.dbPath);
  }

  componentWillMount=()=>{
    // const prevFiles = this.state.files;

    // database.ref(this.dbPath).on('child_added',snap=>{
    //   prevFiles.push({
    //     id: snap.key,
    //     name: snap.val().name,
    //     downloadUrl: snap.val().downloadUrl,
    //     type: snap.val().type
    //   })

    //   this.setState({
    //     files: prevFiles
    //   })
      
    // })

    // database.ref(this.dbPath).on('child_removed',snap=>{
    //   for(let i =0; i<prevFiles.length;i++){
    //     if(prevFiles[i].id === snap.key){
    //       prevFiles.splice(i,1);
    //     }
    //   }
      
    //   this.setState({
    //     files: prevFiles
    //   })

    // })
  }

  deleteFile=(file)=>{
    // storage.ref(this.dbPath+"/"+file.name).delete().then(()=>{
    //   database.ref(this.dbPath).child(file.id).remove();
    //   console.log("deleted successfully!");
    // })
    this.props.onDelete(database,storage,file,this.dbPath);
  }

  render() {
    const files = this.props.files.map(file=>(
      <ImageFile key={file.id} downloadUrl={file.downloadUrl} name={file.name} type={file.type} onClick={()=>this.deleteFile(file)}/>
    ));

    return (
      <div className="App">
        <Input onClick={this.uploadFiles}/>
        <Link to="/logout">logout</Link>
        <h1>{this.props.email}</h1>
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
    files: state.files
  }
}

const  mapDispatchToProps = dispatch =>{
  return{
    onUpload: (database,storage,dbPath,uploadFile)=>dispatch(actions.onUploadFiles(database,storage,dbPath,uploadFile)),
    onDelete: (database,storage,file,dbPath)=>dispatch(actions.deleteFile(database,storage,file,dbPath)),
    subscribeOnDelete: (database,dbPath)=>dispatch(actions.subscribeOnDelete(database,dbPath)),
    subscribeOnAdd: (database,dbPath)=>dispatch(actions.subscribeOnAdd(database,dbPath))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CloudStorage);