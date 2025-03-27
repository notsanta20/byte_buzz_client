import { Routes, Route } from "react-router";
import Main from "./components/main";
import Card from "./components/card";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Card />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
