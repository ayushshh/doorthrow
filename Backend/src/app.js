import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  }),
);
app.use(cors()); // after frontend implementation will be complete
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

export default app;
