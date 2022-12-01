import cors from "cors";
import express from "express";
import {
  validatePassword,
  max,
  email,
  freshEmail,
  validate,
  getErrors,
} from "@snirp/signup-validator/src";

const port = process.env.PORT || 8005;

const app = express();
app.use(cors());
app.use(express.json());

const emails = ["test@test.com", "example@example.com"];
const serverValidateEmail = validate(max(256), email, freshEmail(emails));

app.post("/validate", async (req: express.Request, res: express.Response) => {
  const { password, email } = req.body;
  res.json({
    password: getErrors(validatePassword(password)),
    email: getErrors(serverValidateEmail(email)),
  });
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
