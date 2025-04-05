import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z.object({
  username: z
    .string({
      required_error: "username is required",
    })
    .min(3, {
      message: "Username must be 3 or more characters long",
    }),
  password: z
    .string({
      required_error: "username is required",
    })
    .min(8, { message: "Password must be 8 or more characters long" }),
});

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    const token = localStorage.getItem("authToken");
    const Authorization = `Bearer ${token}`;
    const header = {
      headers: { Authorization },
    };
    const hostUrl = import.meta.env.VITE_SERVER_URL;

    axios
      .post(`${hostUrl}/login`, data, header)
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message === `Username does not exists`) {
          setError("username", { message: `Username does not exists` });
          setError("password", { message: ` ` });
        } else if (message === `invalid Password`) {
          setError("password", { message: `Password is not matching` });
        }
      });
  }

  return (
    <div className="h-full py-5 flex justify-center items-center font-(family-name:--sec-font)">
      <form
        className="flex flex-col gap-5 w-[40%] lg:w-[30%]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="font-semibold text-xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className={`border-2  bg-(--mid-light) dark:bg-(--mid-dark) p-2 outline-none ${
              typeof errors.username === "undefined"
                ? "border-(--sec-light)"
                : "border-(--red)"
            }`}
            {...register("username")}
          />
          <div className="text-sm italic text-(--red) h-2">
            {typeof errors.username === "undefined"
              ? ``
              : errors.username.message}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className={`border-2  bg-(--mid-light) dark:bg-(--mid-dark) p-2 outline-none ${
              typeof errors.password === "undefined"
                ? "border-(--sec-light)"
                : "border-(--red)"
            }`}
            {...register("password")}
          />
          <div className="text-sm italic text-(--red) h-2">
            {typeof errors.password === "undefined"
              ? ``
              : errors.password.message}
          </div>
        </div>
        <button
          className="p-2 border-2 border-(--sec-light) bg-(--mid-light) dark:bg-(--mid-dark) cursor-pointer font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? `Loading` : `Log In`}
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
