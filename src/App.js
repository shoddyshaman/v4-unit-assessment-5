import React from 'react';
import Routes from './routes';
import Nav from './Components/Nav/Nav'
import './App.css';

function App() {
  return (
    <div className='App'>
      <Nav />
      {Routes}
    </div>
  )
};

export default App;
