import dotenv from "dotenv";
import app from "./app.js";
import connectDb from "./db/connect.db.js";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
