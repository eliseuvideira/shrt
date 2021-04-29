import mongoose from "mongoose";
import dotenv from "@ev-fns/dotenv";

dotenv();

const setup = async () => {
  await mongoose.connect(process.env.MONGODB_URI || "", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    dbName: "shrt_test",
  });
};

const teardown = async () => {
  await mongoose.disconnect();
};

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});
