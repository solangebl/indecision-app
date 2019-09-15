import React from 'react';
import Option from './Option';

const Options = (props) => (
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title">Your Options</h3>
      <button 
        className="button button--link"
        onClick={props.handleDelete}>
        Remove all
      </button>
    </div>
    {props.options.length === 0 && <p className="widget__message">Please add some options to get started</p>}
    { props.options.map((opt, index) => (
      <Option 
        key={opt} 
        optionText={opt}
        count={index+1} 
        handleDelete={props.handleDeleteOption}  
      />)) }
  </div>
);

export default Options;