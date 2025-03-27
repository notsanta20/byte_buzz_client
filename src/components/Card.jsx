import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        setData(res.data.posts);
        console.log(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (data.length > 0) {
    data.forEach((post) => {
      return <div>{post.title}</div>;
    });
  } else {
    return <h2>Loading</h2>;
  }
}

export default Card;
