import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router";
import Markdown from "react-markdown";

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
      <div className="grid grid-cols-3 gap-5 py-10">
        {data.map((post) => (
          <div
            className="flex flex-col justify-around p-2 border-2 border-(--sec-light) font-(family-name:--main-font) text-xs"
            key={post.id}
          >
            <div>{formatDate(post.createdAt)}</div>
            <div className="text-xl line-clamp-2">{post.title}</div>
            <div className="font-(family-name:--sec-font) text-base line-clamp-4">
              <Markdown>{post.article}</Markdown>
            </div>
            <div className="flex items-center gap-1">
              <div>{post._count.comments}</div>
              <div className="flex-1">
                <img
                  src="./assets/message-text.svg"
                  alt="comments icon"
                  className="w-[20px]"
                />
              </div>
              <Link to={`/post/${post.id}`} className="flex gap-1">
                Read more
                <img
                  src="./assets/arrow-right.svg"
                  alt="read more"
                  className="w-[20px]"
                />
              </Link>
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
