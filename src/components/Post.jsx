import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";

function Post() {
  const [post, setPost] = useState(``);
  const params = useParams();
  const postId = params.postId;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postId}`)
      .then((res) => {
        setPost(res.data.post);
      })
      .catch((err) => {
        console.log(`Error AXIOS`);
        console.log(err);
      });
  }, []);
  console.log(post.comments);
  function formatDate(date) {
    return format(date, `do MMM yyyy`);
  }

  if (typeof post !== `undefined`) {
    return (
      <section>
        <div>{post.title}</div>
        <p>{post.article}</p>
        <div>
          <h2>Comments</h2>
          <ul>
            {post.comments.map((com) => (
              <li>
                <div>{formatDate(com.createdAt)}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

export default Post;
