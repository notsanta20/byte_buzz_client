import { Routes, Route } from "react-router";
import Main from "./components/main";
import Card from "./components/card";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Card />} />
      </Route>
    </Routes>
  );
}

export default App;
