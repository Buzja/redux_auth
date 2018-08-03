import React from 'react';
import spinner from './tail-spin.svg';
import './Spinner.css';

const Spinner=()=>
<div className="spinner">
    <img src={spinner} alt="Loading..."/>
</div>

export default Spinner;