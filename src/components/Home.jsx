import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router";
import Header from "./Header";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const url = useLocation().pathname;
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/`, { headers: { Authorization } })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="grid grid-cols-[140px_1fr] py-5">
      <div className="logo text-7xl font-(family-name:--main-font) border-r-2 border-(--sec-light) py-5 px-5 h-screen">
        <Link to={`/`}>Buzz Bytes</Link>
      </div>
      <div className="grid grid-rows-[80px_1fr] p-15">
        <Header data={data} url={url} />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
