import React from 'react';
import Display from './Display';
import Buttons from './Buttons';
class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Display />
        <Buttons />
      </div>
    );
  }
}

export default App;
