//Import statements
import express, {Request, Response, Express } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";  

//Express app created 
const app: Express = express();

// Parsing json request
app.use(express.json());

// HTTP request logging with Morgan
app.use(morgan("combined"));

//health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).send("Server is healthy");
});

//employee endpoint
app.use("/api/v1/employee", employeeRoutes)

export default app;