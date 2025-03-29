import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import PostComment from "./PostComment";

function Post() {
  const [post, setPost] = useState(``);
  const params = useParams();
  const postId = params.postId;
  let auth = true;

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postId}`)
      .then((res) => {
        setPost(res.data.post);
        // auth = res.data.auth;
      })
      .catch((err) => {
        console.log(`Error AXIOS`);
        console.log(err);
      });
  }, []);

  console.log(post);

  function formatDate(date) {
    return format(date, `do MMM yyyy`);
  }

  if (post) {
    return (
      <section className="font-(family-name:--sec-font) py-10 flex flex-col gap-8">
        <div className="text-right font-semibold">
          <div>{formatDate(post.createdAt)}</div>
          <div>by {post.authorId}</div>
        </div>
        <div className="font-(family-name:--main-font) text-5xl text-center">
          {post.title}
        </div>
        <div className="self-center">
          <img src="./assets/test.png" alt="image placeholder" />
        </div>
        <p className="px-40 text-lg">{post.article}</p>
        <div>
          <h2 className="text-2xl font-semibold">
            {post.comments.length} Comments
          </h2>
          {auth && <PostComment />}
          <ul>
            {post.comments.map((comment) => (
              <li className="text-lg flex flex-col gap-1" key={comment.id}>
                <div className="font-medium">
                  {comment.usersId} at {formatDate(comment.createdAt)}
                </div>
                <div className="text-md">{comment.comment}</div>
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
