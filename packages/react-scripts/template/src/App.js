import React from 'react';
import Loadable from 'react-loadable';
import logo from './logo.svg';
import './App.css';

const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "SomeComponent" */ './SomeComponent'),
  delay: 500,
  loading: () => <p>loading...</p>,
});

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {typeof logo !== 'object' && <img src={logo} className="App-logo" alt="logo" />}
        <p> 
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoadableComponent />
      </header>
    </div>
  );
}

export default App;
