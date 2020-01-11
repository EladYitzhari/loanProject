import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Header from '../src/components/Js/Header'
import HomePage from './containers/Js/HomePage';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header></Header>
        
    </div>
    </BrowserRouter>
  );
}

export default App;
