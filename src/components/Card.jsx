import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Testing</div>;
}

export default Card;
