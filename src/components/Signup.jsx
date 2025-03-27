import { Link } from "react-router";

function Signup() {
  return (
    <div className="h-full flex justify-center items-center font-(family-name:--sec-font)">
      <form action="" method="post" className="flex flex-col gap-5 w-[30%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold text-xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="border-2 border-(--sec-light) bg-(--mid-light) p-2"
          />
          <div className="text-(--red) text-sm">Error Message</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-(--sec-light) bg-(--mid-light) p-2"
          />
          <div className="text-(--red) text-sm">Error Message</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPass" className="font-semibold text-xl">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            className="border-2 border-(--sec-light) bg-(--mid-light) p-2"
          />
          <div className="text-(--red) text-sm">Error Message</div>
        </div>
        <button className="p-2 border-2 border-(--sec-light) bg-(--mid-light)">
          Sign Up
        </button>
        <div className="text-center">
          Already have an account ?{" "}
          <Link to={`/login`} className="font-semibold">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
