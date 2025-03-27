import { Link } from "react-router";

function HeaderButtons({ auth }) {
  if (auth) {
    return <h2>Log Out</h2>;
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

export default HeaderButtons;
