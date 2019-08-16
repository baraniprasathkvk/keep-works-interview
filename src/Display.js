import React from 'react';
import './Style.css';

class Display extends React.Component {
  render(){
    return (
      <div className="display">
        {this.props.children}
      </div>
    )
  }
}

export default Display;
