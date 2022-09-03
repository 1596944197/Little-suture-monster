import jwt from "jsonwebtoken";
import { readFileSync } from "fs";
// import { Socket } from "socket.io";
import express from "express";

// type RequestUrl = '/favicon.ico' | '/' | '/register'

const app = express();
let i = 0;
app.use(
  "/static",
  express.static("public", {
    cacheControl: true,
    maxAge: 3600 * 1000,
  }),
);

const userInfo: {
  user: Array<{
    id: string;
    token: string;
    name: string;
  }>;
} = JSON.parse(readFileSync("public/data.json", "utf-8"));

export default () => {
  app.get("/", (req, res) => {
    console.log(userInfo);
    res.end();
  });

  app.get("/register", (req, res) => {
    res.cookie(
      "token",
      jwt.sign({ user: i }, `${i++}`, { expiresIn: 3600 * 1000 }),
    );
    res.end();
  });
};
app.listen(3000, () => console.log("is ok"));
