import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import axios from "axios";

function Main() {
  const [time, setTime] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        setTime(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="grid grid-cols-[140px_1fr] py-5">
      <div className="logo text-7xl font-(family-name:--main-font) border-r-2 border-(--sec-light) py-5 px-5 h-screen">
        Buzz Bytes
      </div>
      <div className="grid grid-rows-[80px_1fr] p-15">
        <Header
          time={{
            day: time.length < 1 ? `loading` : time.time.day,
            date: time.length < 1 ? `loading` : time.time.date,
          }}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
