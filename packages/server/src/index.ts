import cors from "cors";
import express from "express";
import { validatePassword, validateEmail } from "@snirp/signup-validator/src";

const port = process.env.PORT || 8005;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req: express.Request, res: express.Response) => {
  const { password, email } = req.body;
  res.json({
    password: validatePassword(password),
    email: validateEmail(email),
  });
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
