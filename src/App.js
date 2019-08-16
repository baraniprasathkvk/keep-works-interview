import React from 'react';
import './Style.css';
import Button from './Button';
import Display from './Display';
import Clear from './Clear';
import ScientificButton from './ScientificButton';

class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      output: 0,
      intermediateOutput: 0,
      intialOutput: 0,
      previousOperator: "+",
      intermediateOutputComputed: 0,
      theme: true,
      buttonClicked: false
    }
  }

  currentInput = () => {
    return this.state.output;
  } 

  displayNumOutput = value => {
    if (this.state.output === 0 || this.state.intermediateOutputComputed === 1) {
      this.setState({ 
        output: value
      });
      this.setState({ 
        intermediateOutputComputed: 0
      });
    }
    else {
      this.setState({ 
        output: this.state.output + value
      });
    }
  }
  
  displayZeroOutput = value => {
    if(
      this.state.output === 0){
      this.setState({ output: 0});
    }
    else {
      this.setState({ 
        output: this.state.output + value
      });
    }
  }

  clearOutput = () => {
    this.setState({ output: 0 });
    this.setState({intermediateOutput: 0});
    this.setState({ intialOutput: 0});
    this.setState({ previousOperator: "+" });
    this.setState({ intermediateOutputComputed: 0});
  };

  eval = operator => {
    this.setState({ intermediateOutputComputed: 1});

    if (this.state.intialOutput === 0 && this.state.previousOperator === "+") {
      this.setState({ 
        intermediateOutput: Number(this.state.intialOutput) + Number(this.state.output) 
      });
      this.setState({ 
        output: Number(this.state.intialOutput) + Number(this.state.output) 
      });
      this.setState({ 
        intialOutput: ""
      });
      this.setState({ 
        previousOperator: operator
      });
    }

    else {
      switch (this.state.previousOperator){
        case "+":
            this.setState({ 
              output: Number(this.state.intermediateOutput) + Number(this.state.output) 
            });
            this.setState({ 
              intermediateOutput: Number(this.state.intermediateOutput) + Number(this.state.output) 
            });
          break;
        case "-":
            this.setState({ 
              output: Number(this.state.intermediateOutput) - Number(this.state.output) 
            });
            this.setState({ 
              intermediateOutput: Number(this.state.intermediateOutput) - Number(this.state.output) 
            });
            break;
        case "*":
            this.setState({ 
              output: Number(this.state.intermediateOutput) * Number(this.state.output) 
            });
            this.setState({ 
              intermediateOutput: Number(this.state.intermediateOutput) * Number(this.state.output) 
            });
            break;
        case "/":
            this.setState({ 
              output: Number(this.state.intermediateOutput) / Number(this.state.output) 
            });
            this.setState({ 
              intermediateOutput: Number(this.state.intermediateOutput) / Number(this.state.output) 
            });
            break;
        default:
      }

      if(operator === "="){
        this.setState({ previousOperator: "+"});
        this.setState({ intialOutput: 0});
      }
      else {
        this.setState({ previousOperator: operator});
      }
    }
  }

  evalSci = operatorSci => {
    switch (operatorSci) {
      case "Sign":
            this.setState({ 
              output: Number(this.state.output) * -1
            });
          break;
      case "Square": 
          this.setState({ 
            output: Number(this.state.output) * Number(this.state.output)
          });
          this.setState({ 
            previousOperator: "+"
          });
          this.setState({
             intialOutput: 0
          });
        break;
      case "SquareRoot":
          this.setState({ 
            output: Number(Math.sqrt(this.state.output))
          });
          this.setState({ 
            previousOperator: "+"
          });
          this.setState({ 
            intialOutput: 0
          });
        break;
        default:
    }
  }

  showScientific = () => {
    if(this.state.buttonClicked === false){
      this.setState({
        buttonClicked: true
      }) 
    }
    else
     this.setState({
       buttonClicked: false
     })
  }

  theme = themevalue => {
    if(themevalue === "Light") {
      this.setState({ theme: true});
      document.body.style.backgroundColor="#fff";
    }
    else{
      this.setState({ theme: false});
      document.body.style.backgroundColor="#000"; 
    }
  }

  render(){
    return (
      <div className="app">
        <div className="calc-wrapper">
          <div className="row">
            <Display>{this.state.output}</Display>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Button handleClick={this.displayNumOutput}>1</Button>
            <Button handleClick={this.displayNumOutput}>2</Button>
            <Button handleClick={this.displayNumOutput}>3</Button>
            <Button handleClick={this.eval}>+</Button>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Button handleClick={this.displayNumOutput}>4</Button>
            <Button handleClick={this.displayNumOutput}>5</Button>
            <Button handleClick={this.displayNumOutput}>6</Button>
            <Button handleClick={this.eval}>-</Button>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Button handleClick={this.displayNumOutput}>7</Button>
            <Button handleClick={this.displayNumOutput}>8</Button>
            <Button handleClick={this.displayNumOutput}>9</Button>
            <Button handleClick={this.eval}>*</Button>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Clear handleClear={this.clearOutput}>clear</Clear>
            <Button handleClick={this.displayZeroOutput}>0</Button>
            <Button handleClick={this.eval}>=</Button>
            <Button handleClick={this.eval}>/</Button>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Button handleClick={this.theme} className={this.state.theme}>Light</Button>
            <Button handleClick={this.theme} className={this.state.theme}>Dark</Button>
          </div>
          <div className={this.state.theme ? "row" : "row-dark"}>
            <Button handleClick={this.showScientific}>Scientific</Button>
          </div>

          {
            this.state.buttonClicked?
          <div className={this.state.theme ? "row" : "row-dark"}>
            <ScientificButton handleClick={this.evalSci}>Sign</ScientificButton>
            <ScientificButton handleClick={this.evalSci}>Square</ScientificButton>
            <ScientificButton handleClick={this.evalSci}>SquareRoot</ScientificButton>
          </div>
          :
          <div></div>
          }
          
        </div>
      </div>
    )
  }
}

export default App;
