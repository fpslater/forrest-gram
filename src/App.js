import React, { Component } from 'react';

import TileLayout from './containers/TileLayout';

import logo from './logo.png';

class App extends Component {

  render() {
    return (
      <div className="App" >
        <header>
          <img className="logo-icon" alt="logo" src={logo}/>
          <span className="logo-title">ForrestGram</span>
          <span className="logo-description">All Forrest, all the time.</span>
        </header>
        <section className='main-content'>
          <TileLayout />
        </section>
      </div>
    );
  }
}

export default App;
