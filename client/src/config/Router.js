import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../containers/Home";
import Checkout from "../containers/Checkout";
import Signup from "../containers/signup";
import Login from "../containers/login";
import { Navigate } from "react-router-dom";
function AppRouter() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {user && <Route path="/" exact element={<Home />} />}
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
