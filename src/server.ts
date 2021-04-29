import dotenv from "@ev-fns/dotenv";

dotenv({}, ({ NODE_ENV, npm_package_version }) => {
  console.info(NODE_ENV);
  console.info(npm_package_version);
});

import server from "@ev-fns/server";
import mongoose from "mongoose";
import app from "./app";

const PORT = +(process.env.PORT || 0) || 3000;

server({
  app,
  port: PORT,
  before: async () => {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "shrt",
    });
  },
  after: async () => {
    console.info(`http://localhost:${PORT}`);
  },
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
