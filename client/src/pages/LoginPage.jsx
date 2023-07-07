import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, user, isAuthenticated, loginErrors } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  const onSubmit = handleSubmit(async (data) => {
    await login(data);
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {loginErrors.map((error, i) => {
        return <div key={i}>{error}</div>;
      })}
      <h2 className="select-none text-2xl font-bold py-5">LogIn</h2>
      <form
        onSubmit={onSubmit}
        className="w-[calc(100%-50px)] max-w-[380px] min-w-[320px] sm:w-[calc(1/2 - 40px)] md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 rounded-xl bg-zinc-700 py-10 px-10 select-none"
      >
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
          className="block rounded-md w-full my-5 px-4 py-1 bg-zinc-500 focus:outline-none"
        ></input>
        {errors.email && <p>email is required</p>}
        <input
          type="password"
          placeholder="password"
          autoComplete="off"
          {...register("password", { required: true })}
          className="block rounded-md w-full my-5 px-4 py-1 bg-zinc-500 focus:outline-none"
        ></input>
        {errors.password && <p>password is required</p>}
        <button type="submit" className="bg-zinc-500 rounded-md w-28 py-2 hover:bg-blue-600 transition-all">
          Login
        </button>
        <div className="flex justify-between py-5">
        <p>Have not an account?</p>
        <Link to={"/register"}>
          Sign Up
        </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
