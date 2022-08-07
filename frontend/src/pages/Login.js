import { useEffect, useRef, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../store/auth/authSlice";

const Login = () => {
  const [message, setMessage] = useState(null);
  const { user, isSuccessFull } = useSelector((state) => state.auth);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user || isSuccessFull) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccessFull, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = {
      email,
      password,
    };

    dispatch(login(formData));
  };
  return (
    <div className="w-3/4 mx-auto">
      <div className="p-4">
        <h1 className="flex items-center justify-center text-4xl font-bold">
          <FiLogIn className="mx-2" />
          Login
        </h1>
        <p className="text-2xl text-zinc-500  text-center mt-3  font-extrabold ">
          Please Login To get Support.
        </p>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-5 w-4/5 mx-auto"
      >
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Your Email"
          className="border outline-none text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter  Password"
          className="border outline-none  text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        {message && (
          <p className="text-red-600 text-sm uppercase font-bold">{message}</p>
        )}
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
