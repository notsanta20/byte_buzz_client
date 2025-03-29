import { Link } from "react-router";

function HeaderButton({ auth }) {
  if (auth) {
    return (
      <div
        className="text-(--sec-light) cursor-pointer"
        onClick={() => {
          localStorage.setItem("authToken", null);
          window.location.reload();
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
        <div className="bg-(--mid-light) font-semibold border-2 border-(--sec-light) py-2 px-5">
          <Link to={`/signup`}>Sign Up</Link>
        </div>
      </>
    );
  }
}

export default HeaderButton;
