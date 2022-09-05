import type { Express } from "express";
import formidable from "formidable";
import { readFileSync, writeFileSync } from "fs";
import jwt from "jsonwebtoken";

const i = 0;
const expiredTime = 3600 * 1000;
const key = "jwtKey";

const userInfo: {
  users: Array<{
    id: string | number;
    token: string;
    account: string;
    password: string;
  }>;
} = JSON.parse(readFileSync("public/data.json", "utf-8"));

export default (app: Express) => {
  app.all("/*", (req, res, next) => {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.post("/register", async (req, res, next) => {
    const users = userInfo.users;
    const {
      data: { account, password },
    } = await parseFormData<{ account: string; password: string }>(req);

    const target = users.find((user) => user.account === account);

    if (target) {
      res.send({ success: false, msg: "用户已存在" });
    } else {
      const token = jwt.sign({ user: i }, key, { expiresIn: expiredTime });
      res.cookie("token", token, { httpOnly: true, maxAge: expiredTime });
      res.send({ success: true, msg: "注册成功" });
      userInfo.users.push({
        id: i,
        token,
        account,
        password,
      });
    }
    next();
  });

  app.post("/login", async (req, res, next) => {
    const token = getToken(req.headers.cookie);
    jwt.verify(token, key, (err) => {
      if (err) {
        res.send({ success: false, msg: "令牌过期" });
      } else {
        res.statusCode = 302;
        res.setHeader("location", "/home");
        res.send({ success: true, msg: "登陆成功" });
      }
    });
    next();
  });
};

async function parseFormData<Res extends {}>(
  req,
): Promise<{ data: Res; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, data, files) => {
      err && reject(err);
      const result = {};
      for (const key in data) {
        result[key] = typeof data[key] === "string" ? data[key] : data[key][0];
      }
      resolve({
        data: result as Res,
        files,
      });
    });
  });
}

function getToken(str = "") {
  return str.split("=")[1];
}

process.on("beforeExit", () => {
  writeFileSync("public/data.json", JSON.stringify(userInfo), "utf8");
});
