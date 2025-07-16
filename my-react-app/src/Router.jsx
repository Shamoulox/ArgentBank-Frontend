import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "../src/redux/store/store.js";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import User from "./pages/User.jsx";
import Error from "./components/Error.jsx";
import "./styles/main.css";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
