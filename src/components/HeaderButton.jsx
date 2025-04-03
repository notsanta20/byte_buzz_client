import { Link } from "react-router";

function HeaderButton({ auth, setAuth }) {
  if (auth) {
    return (
      <div
        className="cursor-pointer"
        onClick={() => {
          localStorage.setItem("authToken", null);
          const num = Math.floor(Math.random() * 100);
          setAuth(num);
        }}
      >
        Log Out
      </div>
    );
  } else {
    return (
      <>
        <div className="text-(--sec-light)">
          <Link to={`/login`}>Log In</Link>
        </div>
        <div className="bg-(--mid-light) dark:bg-(--mid-dark) font-semibold border-2 border-(--sec-light) py-2 px-5">
          <Link to={`/signup`}>Sign Up</Link>
        </div>
      </>
    );
  }
}

export default HeaderButton;
