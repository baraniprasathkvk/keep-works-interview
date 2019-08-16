import React from 'react';
import './Style.css';

class Clear extends React.Component {
  render(){
    return (
      <div className="button" onClick={() => this.props.handleClear()}>
        {this.props.children}
      </div>
    )
  }
}

export default Clear;
