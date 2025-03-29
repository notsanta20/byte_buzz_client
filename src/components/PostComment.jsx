function PostComment() {
  return (
    <form className="flex flex-col gap-2">
      <textarea
        name="comment"
        id="comment"
        className="border-2 border-(--sec-light)"
      ></textarea>
      <button>Post Comment</button>
    </form>
  );
}

export default PostComment;
