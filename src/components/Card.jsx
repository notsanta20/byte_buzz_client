import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router";

function Card() {
  const [data, setData] = useState([]);

  //get posts from the server and set to DATA variable
  useEffect(() => {
    axios
      .get(`http://localhost:3000/`)
      .then((res) => {
        setData(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //format date to readable format
  function formatDate(date) {
    return format(date, `do MMM yyyy`);
  }

  if (data.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-5 py-4">
        {data.map((post) => (
          <div
            className="flex flex-col justify-around p-2 border-2 border-(--sec-light) font-(family-name:--sec-font) max-h-[400px]"
            key={post.id}
          >
            <div className="w-[200px] h-[200px] overflow-hidden self-center">
              <img
                src="./assets/test.png"
                alt="article image"
                className="w-[1500px] h-[1500px]"
              />
            </div>
            <div>{formatDate(post.createdAt)}</div>
            <div className="text-center text-2xl">{post.title}</div>
            <div className="flex">
              <div className="flex-1">{post._count.comments}</div>
              <div>
                <Link to={`/post/${post.id}`}>Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

export default Card;
