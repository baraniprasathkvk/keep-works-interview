import React from 'react';
import './Style.css';

class ScientificButton extends React.Component {
  render(){
    return (
      <div className="button" onClick={() => this.props.handleClick(this.props.children)}>
        {this.props.children}
      </div>
    )
  }
}

export default ScientificButton;
