import { useEffect, useRef, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { login, reset } from "../store/auth/authSlice";

const Login = () => {
  const { user, isSuccessFull, isError, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (user || isSuccessFull) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccessFull, isError, message, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error("Kindly enter email and password");
    }

    const formData = {
      email,
      password,
    };

    dispatch(login(formData));
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="w-4/5 md:w-3/4 mx-auto">
      <div className="p-4 mt-5">
        <h1 className="flex items-center justify-center text-xl md:text-4xl font-bold">
          <FaSignInAlt className="mx-2" />
          Login
        </h1>
        <p className="text-lg md:text-2xl text-zinc-500   text-center mt-3  font-bold md:font-extrabold ">
          Please Login To get Support.
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex w-4/5 flex-col  gap-5 md:w-4/5 mx-auto"
      >
        <input
          ref={emailRef}
          required
          type="email"
          placeholder="Enter Your Email"
          className="border  outline-none text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        <input
          ref={passwordRef}
          required
          type="password"
          placeholder="Enter  Password"
          className="border outline-none  text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md text-xs font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
