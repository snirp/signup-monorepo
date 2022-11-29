import React from "react";
import { validatePassword } from "@snirp/signup-validator/src";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {validatePassword("ee8FF").map(({ valid, message }, idx) => (
            <div key={idx}>
              {valid} {message}
            </div>
          ))}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
