import { useState, useMemo } from "react";
import axios from "axios";
import {
  validatePassword,
  validateEmail,
  isValid,
} from "@snirp/signup-validator/src";

const server = axios.create({
  baseURL: "http://localhost:8005",
});

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState<string[] | null>();
  const [passwordErrors, setPasswordErrors] = useState<string[] | null>();
  const [validating, setValidating] = useState(false);

  const clientValid = useMemo(
    () => isValid(validatePassword(password)) && isValid(validateEmail(email)),
    [email, password]
  );
  const handleSubmit = () => {
    setValidating(true);
    server
      .post("/validate", { email, password })
      .then(({ data }) => {
        setEmailErrors(data.email);
        setPasswordErrors(data.password);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setValidating(false);
      });
  };

  return (
    <div id="App">
      <label htmlFor="email">Email</label>
      <input
        name="email"
        onChange={(evt) => {
          setEmail(evt.target.value);
          setEmailErrors(null);
        }}
        value={email}
      />
      <ul style={{ color: "red" }}>
        {Array.isArray(emailErrors) &&
          emailErrors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
      <div>
        {validatePassword(password).map(({ valid, message }, idx) => (
          <div key={idx}>
            {valid ? "ok" : "NO"} - {message}
          </div>
        ))}
      </div>
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        onChange={(evt) => {
          setPassword(evt.target.value);
          setPasswordErrors(null);
        }}
        value={password}
      />
      <ul style={{ color: "red" }}>
        {Array.isArray(passwordErrors) &&
          passwordErrors.map((err, idx) => <li key={idx}>{err}</li>)}
      </ul>
      <button
        disabled={
          !clientValid || validating || !!emailErrors || !!passwordErrors
        }
        onClick={handleSubmit}
      >
        Create account
      </button>
    </div>
  );
}

export default App;
