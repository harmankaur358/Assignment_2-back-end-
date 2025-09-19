import express, {Request, Response, Express } from "express";
import morgan from "morgan";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

//health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

export default app;