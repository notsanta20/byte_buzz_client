import { Routes, Route } from "react-router";
import Home from "./components/Home";
import Card from "./components/Card";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Post from "./components/Post";
import Error from "./components/Error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Card />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
