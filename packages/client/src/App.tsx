import { validatePassword } from "@snirp/signup-validator/src";

const PW = "ee4";

function App() {
  return (
    <div id="App">
      {PW}
      {validatePassword(PW).map(({ valid, message }, idx) => (
        <div key={idx}>
          {valid ? "ok" : "NO"} - {message}
        </div>
      ))}
    </div>
  );
}

export default App;
