import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
// import { Socket } from "socket.io";
import express from "express";
import cors from "cors";
import formidable from "formidable";

const app = express();
let i = 0;
app.use(
  "/static",
  express.static("public", {
    cacheControl: true,
    maxAge: 3600 * 1000,
  }),
);
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userInfo: {
  user: Array<{
    id: string;
    token: string;
    account: string;
    password: string;
  }>;
} = JSON.parse(readFileSync("public/data.json", "utf-8"));

const expiredTime = 3600 * 1000;

export default () => {
  app.all("/*", (req, res, next) => {
    next();
  });

  app.post("/register", async (req, res, next) => {
    jwt.sign({ user: i }, `${i++}`, { expiresIn: expiredTime });
    const { data } = await parseFormData(req);
    res.end(JSON.stringify(data));
  });

  app.post("/login", async (req, res, next) => {
    res.end({ a: 1, b: 2 });
  });
};
app.listen(3000, () => console.log("is ok"));

async function parseFormData(
  req,
): Promise<{ data: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, data, files) => {
      err && reject(err);
      resolve({
        data,
        files,
      });
    });
  });
}
