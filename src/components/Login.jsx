import { Link } from "react-router";
import { useState } from "react";

function Login() {
  const [userData, setUserDate] = useState({
    username: ``,
    password: ``,
  });
  const [errorMessage, setErrorMessage] = useState({
    username: ` `,
    password: ` `,
  });
  const [disabled, setDisabled] = useState(true);

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUserDate({
      ...userData,
      username: value,
    });
    if (!value.trim()) {
      setErrorMessage({
        ...errorMessage,
        username: `Username should not be empty`,
      });
      setDisabled(true);
    } else if (value.trim().length < 4) {
      setErrorMessage({
        ...errorMessage,
        username: `Username should be more than 3 characters`,
      });
      setDisabled(true);
    } else {
      setErrorMessage({
        ...errorMessage,
        username: ``,
      });
      setDisabled(false);
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setUserDate({
      ...userData,
      password: value,
    });
    if (!value.trim()) {
      setErrorMessage({
        ...errorMessage,
        password: `Password should not be empty`,
      });
      setDisabled(true);
    } else if (value.trim().length < 8) {
      setErrorMessage({
        ...errorMessage,
        password: `Password should be at least 8 characters`,
      });
      setDisabled(true);
    } else {
      setErrorMessage({
        ...errorMessage,
        password: ``,
      });
      setDisabled(false);
    }
  }

  return (
    <div className="h-full flex justify-center items-center font-(family-name:--sec-font)">
      <form
        action="http://localhost:3000/login"
        method="post"
        className="flex flex-col gap-5 w-[30%]"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold text-xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={`border-2  bg-(--mid-light) p-2 outline-none ${
              errorMessage.username ? "border-(--red)" : "border-(--sec-light)"
            }`}
            min="3"
            value={userData.username}
            onChange={handleUsernameChange}
          />
          <div className="text-(--red) text-sm">{errorMessage.username}</div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`border-2  bg-(--mid-light) p-2 outline-none ${
              errorMessage.password ? "border-(--red)" : "border-(--sec-light)"
            }`}
            value={userData.password}
            onChange={handlePasswordChange}
          />
          <div className="text-(--red) text-sm">{errorMessage.password}</div>
        </div>
        <button
          className="p-2 border-2 border-(--sec-light) bg-(--mid-light) cursor-pointer"
          disabled={disabled}
        >
          Log In
        </button>
        <div className="text-center">
          Don't have an account ?{" "}
          <Link to={`/signup`} className="font-semibold">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
