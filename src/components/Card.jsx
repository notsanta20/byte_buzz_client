import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link, useOutletContext } from "react-router";

function Card() {
  const [data, setData] = useState([]);
  const darkTheme = useOutletContext()[2];

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
      <div className="grid grid-cols-3 gap-5 py-10 content-start">
        {data.map((post) => (
          <div
            className="flex flex-col justify-around gap-3 p-2 border-2 border-(--sec-light) font-(family-name:--main-font) text-xs"
            key={post.id}
          >
            <div>{formatDate(post.createdAt)}</div>
            <div className="text-xl line-clamp-2">{post.title}</div>
            <div className="font-(family-name:--sec-font) text-base line-clamp-4 prose dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: post.article }} />
            </div>
            <div className="flex items-center gap-1">
              <div>{post._count.comments}</div>
              <div className="flex-1">
                <img
                  src={
                    darkTheme
                      ? "./assets/message-text-dark.svg"
                      : "./assets/message-text-light.svg"
                  }
                  alt="comments icon"
                  className="w-[20px]"
                />
              </div>
              <Link to={`/post/${post.id}`} className="flex gap-1">
                Read more
                <img
                  src={
                    darkTheme
                      ? "./assets/arrow-right-dark.svg"
                      : "./assets/arrow-right-light.svg"
                  }
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
