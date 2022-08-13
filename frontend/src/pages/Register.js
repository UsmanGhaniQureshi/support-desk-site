import { useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { register, reset } from "../store/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccessFull, isError, message, user } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccessFull || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccessFull, user, navigate, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const cPassword = confirmPasswordRef.current.value;

    if (password !== cPassword) {
      toast.error("Password Not Matched");
      return;
    }

    const formData = {
      email,
      name,
      password,
    };

    dispatch(register(formData));
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="w-3/4 mx-auto">
      <div className="p-4">
        <h1 className="flex items-center justify-center text-4xl font-bold">
          <FaUser className="mx-2" />
          Register
        </h1>
        <p className="text-2xl text-zinc-500  text-center mt-3  font-extrabold ">
          Please Create An Account
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
          type={"text"}
          ref={nameRef}
          placeholder="Enter Your Name"
          className="border outline-none  text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter  Password"
          className="border outline-none  text-sm px-3 rounded py-1 focus:border-blue-600"
        />
        <input
          ref={confirmPasswordRef}
          type="password"
          placeholder="Confirm Password"
          className="border outline-none  text-sm px-3 rounded py-1 focus:border-blue-600"
        />

        <button
          type="submit"
          className="bg-black text-white py-2 rounded-md text-xs font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
