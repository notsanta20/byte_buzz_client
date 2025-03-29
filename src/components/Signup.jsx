import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const schema = z
  .object({
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
      .min(5, { message: "Password must be 8 or more characters long" }),
    confirmPass: z
      .string({
        required_error: "username is required",
      })
      .min(5, { message: "Password must be 8 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: `Passwords are not matching`,
    path: ["confirmPass"],
  });

function Signup() {
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
      .post(`http://localhost:3000/signup`, data, header)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        const message = err.response.data.error;
        if (message === `Username already exists`) {
          setError("username", { message: `Username already exists` });
        } else {
          setError("root", { message: `Internal server error, try again` });
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
            className={`border-2  bg-(--mid-light) p-2 outline-none ${
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
            className={`border-2  bg-(--mid-light) p-2 outline-none ${
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
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPass" className="font-semibold text-xl">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            className={`border-2  bg-(--mid-light) p-2 outline-none ${
              typeof errors.confirmPass === "undefined"
                ? "border-(--sec-light)"
                : "border-(--red)"
            }`}
            {...register("confirmPass")}
          />
          <div className="text-sm italic text-(--red) h-2">
            {typeof errors.confirmPass === "undefined"
              ? ``
              : errors.confirmPass.message}
          </div>
          <div className="text-sm italic text-(--red) h-2">
            {typeof errors.root === "undefined" ? `` : errors.root.message}
          </div>
        </div>
        <button
          className="p-2 border-2 border-(--sec-light) bg-(--mid-light) cursor-pointer font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? `Loading` : `Sign Up`}
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

export default Signup;
