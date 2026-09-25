import logo from './logo.svg';
import './App.css';
import React  from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import OtherPage from "./otherPage";
import Fib from "./Fib";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link to="/" > Home </Link>
          <Link to = "/otherpage">Other Page </Link>
        </header>
        <div>
          <Routes>
            <Route path ="/" element = {<Fib />} />
            <Route path ="/otherpage" element = {<OtherPage />} />
          </Routes>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
