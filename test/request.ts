import supertest from "supertest";
import app from "../src/app";

const _request = supertest(app);
export const request = () => _request;
