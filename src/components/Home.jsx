import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router";
import Header from "./Header";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const url = useLocation().pathname;
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/`, header)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, refresh]);

  return (
    <div className="grid grid-cols-[140px_1fr] py-5 h-screen">
      <div className="logo text-7xl font-(family-name:--main-font) border-r-2 border-(--sec-light) py-5 px-5 h-full">
        <Link to={`/`}>Byte Buzz</Link>
      </div>
      <div className="grid grid-rows-[80px_1fr] p-15">
        <Header data={data} url={url} setAuth={setRefresh} />
        <Outlet context={[refresh, setRefresh]} />
      </div>
    </div>
  );
}

export default Home;
