import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { readdirSync } from "fs";
import { join } from "path";
import morgan from "morgan";
import openapi from "@ev-fns/openapi";
import { notFound, exception } from "@ev-fns/errors";
import path from "path";
import ejs from "ejs";
import { minify } from "html-minifier";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

const app = express();

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.engine("ejs", (filePath, options, callback) =>
  (ejs as any).__express(filePath, options, (err: any, html: any) => {
    if (err) {
      return callback(err);
    }
    return callback(
      null,
      minify(html, {
        removeComments: true,
        minifyCSS: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
      }),
    );
  }),
);

app.use(cors());
app.use(json());
app.use(morgan("combined", { skip: () => process.env.NODE_ENV === "test" }));
app.use(openapi({ apiName: process.env.API_NAME || "", redirect: false }));
app.use(slowDown({ windowMs: 15 * 60 * 1000, delayAfter: 100, delayMs: 500 }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get("/", (req, res) => res.render("pages/index.ejs"));
app.use("/public/", express.static(path.join(__dirname, "..", "public")));

const routes = readdirSync(join(__dirname, "routes"));
for (const route of routes) {
  app.use(require(join(__dirname, "routes", route)).default);
}

app.use(notFound);
app.use(exception);

export default app;
