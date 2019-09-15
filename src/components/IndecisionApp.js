import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

// pull state oute of constructor
// convert event handlers
// delete constructor
// start with class properties - end with methods

class IndecisionApp extends React.Component {
  state = {
	options: [],
	selectedOption: undefined
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: []} ) );
  };
  handleDeleteOption = (toRemove) => {
	  this.setState((prevState) => ({ 
      options: prevState.options.filter((option) => {
				return option !== toRemove
      })
    }));
  };
  handlePick = () => {
    const rand = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[rand];
    this.setState(() => ({
        selectedOption: option
      })
    );
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Enter valid option';
    } else if (this.state.options.indexOf(option) != -1) {
      return 'Option already exists';
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };
  handleClose = () => {
    this.setState((prevState) => ({
        selectedOption: undefined
      })
    )
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const ops = JSON.parse(json);
      if (ops) {
        this.setState( () => ( { options: ops} ) );
      }
    } catch (e) {
      
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length != this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			console.log(json);
      localStorage.setItem('options', json);
    }
  }
  
  render() {
    const subtitle = 'Put your life in the hands of a computer';
    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action hasOptions={this.state.options.length>0} handlePick={this.handlePick} />
          <div className="widget">
            <Options 
              options={this.state.options} 
              handleDelete={this.handleDeleteOptions} 
              handleDeleteOption={this.handleDeleteOption} />
            <AddOption 
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption} 
          handleCloseModal={this.handleClose}
        />
      </div>
    )
  }
}

IndecisionApp.defaultProps = {
  options: []
}

export default IndecisionApp;