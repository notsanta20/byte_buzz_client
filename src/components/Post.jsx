import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { format } from "date-fns";
import PostComment from "./PostComment";
import { Link, useOutletContext } from "react-router";

function Post() {
  const [post, setPost] = useState(``);
  const [auth, setAuth] = useState(false);
  const [refresh, setRefresh, darkTheme] = useOutletContext();
  const params = useParams();
  const postId = params.postId;
  const token = localStorage.getItem("authToken");
  const Authorization = `Bearer ${token}`;
  const header = {
    headers: { Authorization },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postId}`, header)
      .then((res) => {
        setPost(res.data.post);
        setAuth(res.data.auth);
      })
      .catch((err) => {
        console.log(`Error AXIOS`);
        console.log(err);
      });
  }, [refresh]);

  function formatDate(date) {
    return format(date, `do MMM yyyy`);
  }

  if (post) {
    return (
      <section className="font-(family-name:--sec-font) py-10 flex flex-col gap-8">
        <div className="flex">
          <Link to="/" className="flex-1 flex items-center gap-2">
            <img
              src={
                darkTheme
                  ? "/assets/arrow-left-dark.svg"
                  : "/assets/arrow-left-light.svg"
              }
              alt="back to index"
              className="w-[20px] h-auto"
            />
            Back
          </Link>
          <div className="text-right font-semibold">
            <div>{formatDate(post.createdAt)}</div>
            <div>by {post.author.username}</div>
          </div>
        </div>
        <div className="font-(family-name:--main-font) text-5xl text-center">
          {post.title}
        </div>
        <div className="px-40 prose dark:prose-invert !max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.article }} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            {post.comments.length} Comments
          </h2>
          {auth ? (
            <PostComment postId={post.id} setRefresh={setRefresh} />
          ) : (
            <h3 className="font-semibold underline">login to post comments</h3>
          )}
          <ul className="flex flex-col gap-3">
            {post.comments.map((comment) => (
              <li
                className="text-lg flex flex-col py-3 border-b-1 border-(--sec-light)"
                key={comment.id}
              >
                <div className="font-medium">
                  {comment.Users.username} at {formatDate(comment.createdAt)}
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
