import React from 'react';
import './ImageFile.css';
import docImg from './doc.svg';

function ImageFile({downloadUrl,name,type,onDownload,onDelete})
{
  return(
    <div className="imageFile">
    <div className="info_wrapper">
    <div className="imageFile__image_wrapper" style={type.search("image") !== -1 ?
    {backgroundImage: `url("${downloadUrl.toString()}")`} : 
    {backgroundImage: `url("${docImg}")`,backgroundSize: '30%', backgroundColor: "#efefef"}}>
          <button  className="imageFile__del_btn" onClick={onDelete}>X</button>
        </div>
        <div className="name_sec">
          <div className="name_sec__type">name:</div>
          <div className="name_sec__name">{name}</div>
        </div>
    </div>
        <div className="imageFile__download_sec">
        <button id="download" 
        className="imageFile__dwnld_btn" 
        onClick={onDownload}>download</button>
        </div>
    </div>
  );
} 

export default ImageFile;