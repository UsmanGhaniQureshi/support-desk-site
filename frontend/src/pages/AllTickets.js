import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTickets, reset } from "../store/tickets/ticketSlice";

const AllTickets = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.ticket);
  const { user, isSuccessFull } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && !isSuccessFull) navigate("/login");
    dispatch(getTickets());
  }, [user, isSuccessFull, navigate, dispatch]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex gap-2 mt-8 border-black items-center border px-5 font-bold py-1 text-sm rounded-md"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <h1 className="text-3xl text-slate-900 text-center font-bold">Tickets</h1>

      <table className="min-w-full border text-center">
        <thead className="border-b bg-zinc-300 ">
          <tr className="bg-zinc-300">
            <th>Date</th>
            <th>Product</th>
            <th colSpan={2}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item) => (
            <TableRow key={item._id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTickets;
