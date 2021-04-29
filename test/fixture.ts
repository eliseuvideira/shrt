import mongoose from "mongoose";
import dotenv from "@ev-fns/dotenv";
import { connect } from "@ev-fns/mongo";

dotenv();

const setup = async () => {
  await connect(mongoose, {
    protocol: process.env.MONGODB_PROTOCOL,
    server: process.env.MONGODB_SERVER,
    port: +process.env.MONGODB_PORT,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASSWORD,
    database: process.env.MONGODB_DATABASE + "_test",
  } as any);
};

const teardown = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
};

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});
