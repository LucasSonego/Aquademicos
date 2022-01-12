import app from "./app";
import "dotenv/config";

app.listen(process.env.APP_PORT, () =>
  console.log(`Server is up (port ${process.env.APP_PORT})`)
);
