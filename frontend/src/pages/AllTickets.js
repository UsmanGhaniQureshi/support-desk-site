import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaArrowLeft } from "react-icons/fa";

import { getTickets } from "../store/tickets/ticketSlice";
import TableRow from "../components/TableRow";
import LoadingSpinner from "../components/LoadingSpinner";

const AllTickets = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.ticket);
  const { user, isSuccessFull } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user && !isSuccessFull) navigate("/login");
    dispatch(getTickets());
  }, [user, isSuccessFull, navigate, dispatch]);
  if (isLoading) return <LoadingSpinner />;
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
      {tickets.length > 0 ? (
        <table className="min-w-full mt-3 border text-center">
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
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <p>No Tickets Found</p>
          <Link to="/create-ticket">Create A New Ticket</Link>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
