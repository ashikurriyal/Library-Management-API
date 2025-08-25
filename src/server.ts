import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { config } from "./config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.dbUrl);

    server = app.listen(config.port, () => {
      console.log(`Server is running on PORT ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
export default app;