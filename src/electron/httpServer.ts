import express from "express";
import Routes from "./routes";

const app = express();
app.use(
  "/static",
  express.static("public", {
    cacheControl: true,
    maxAge: 3600 * 1000,
  }),
);
app.use(express.urlencoded({ extended: false }));

export default () => {
  Routes(app);
};
app.listen(3000, () => console.log("is ok"));
