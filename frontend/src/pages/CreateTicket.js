import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../store/tickets/ticketSlice";

const CreateTicket = () => {
  const { isError, isSuccessFull, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("iphone");
  const commentRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccessFull || user) {
      const { email, name } = user;
      setEmail(email);
      setName(name);
    }
    if (!isSuccessFull && !user) {
      navigate("/login");
    }
  }, [isError, isSuccessFull, isLoading, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = {
      product,
      comment: commentRef.current.value,
    };
    dispatch(createTicket(formData));
    navigate("/tickets");
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="flex gap-2 mt-8 border-black items-center border px-5 font-bold py-1 text-sm rounded-md"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <div className="w-3/4 mx-auto">
        <div className="p-4">
          <h1 className="flex items-center justify-center text-4xl font-bold">
            Create New Ticket
          </h1>
          <p className="text-2xl text-zinc-500  text-center mt-3  font-extrabold ">
            Please Fill Out the Below form
          </p>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-5 w-4/5 mx-auto"
        >
          <div className="flex flex-col">
            <label className="text-xs font-bold">Customer Name</label>
            <input
              disabled
              type="text"
              value={name}
              className="border outline-none  px-1 rounded py-2 text-xs font-bold focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold">Customer Email</label>
            <input
              disabled
              type="text"
              value={email}
              className="border outline-none  px-1 rounded py-2 text-xs font-bold focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold">Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="bg-slate-800 text-white px-3 "
            >
              <option value="iphone">iPhone</option>
              <option value="macbook">macBook</option>
              <option value="ipad">iPad</option>
              <option value="samsung">Samsung</option>
              <option value="others">Others</option>
            </select>
          </div>
          <textarea
            ref={commentRef}
            className="px-2 py-2 border rounded-sm outline-none focus:border-pink-500"
            placeholder="Description"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded-md text-xs font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTicket;
