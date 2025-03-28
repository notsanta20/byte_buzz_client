import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  comment: z.string().min(1, {
    message: "comments should not be empty",
  }),
});

function PostComment({ postId }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const header = {
      headers: { Authorization },
    };

    axios
      .post(`http://localhost:3000/comment/${postId}`, data, header)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.status === 401) {
          setError(`comment`, { message: `Login to post comments` });
        } else {
          setError(`comment`, { message: `Internal server error, try again` });
        }
      });
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <textarea
        name="comment"
        id="comment"
        rows={5}
        className="border-2 border-(--sec-light) outline-none p-2"
        {...register("comment")}
      ></textarea>
      <div className="text-sm italic text-(--red) h-2">
        {typeof errors.comment === `undefined` ? `` : errors.comment.message}
      </div>
      <button className="border-2 border(--sec-light) p-2 self-center">
        {isSubmitting ? "posting comment" : "Post Comment"}
      </button>
    </form>
  );
}

export default PostComment;
