import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TableRow from "../components/TableRow";

const AllTickets = () => {
  const navigate = useNavigate();

  const tickets = [
    { product: "MacBook", status: "new", id: 1 },
    { product: "Iphone", status: "new", id: 2 },
    { product: "Samsung", status: "closed", id: 3 },
    { product: "MacBook", status: "new", id: 4 },
    { product: "MacBook", status: "closed", id: 5 },
    { product: "MacBook", status: "closed", id: 6 },
  ];

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
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTickets;
