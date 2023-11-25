import cors from "cors";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome new server!",
  });
});

export default app;
