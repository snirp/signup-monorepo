import cors from "cors";
import express from "express";
import hello from "@snirp/signup-validator/src";

const port = process.env.PORT || 8005;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (_: express.Request, res: express.Response) => {
  res.json({ hello });
});

app.listen(port, () =>
  console.log(`Server is running on port: http://localhost:${port}`)
);
