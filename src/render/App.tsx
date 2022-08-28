import React from "react";
import Mine from "./view/Mine/Mine";
import Home from "./view/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./view/Login/Login";

const r: Array<{
  path: string;
  Component: () => JSX.Element;
}> = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/mine",
    Component: Mine,
  },
];

function App(): JSX.Element {
  return (
    <section className="container">
      <Routes>
        {r.map(({ path, Component }) => (
          <Route path={path} key={path} element={<Component />} />
        ))}
      </Routes>
    </section>
  );
}

export default App;
