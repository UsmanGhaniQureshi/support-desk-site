import { Link } from "react-router-dom";

const TableRow = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="px-6 py-4">{item.createdAt}</td>
      <td className="px-6 py-4">{item.product}</td>
      <td className="px-6 py-4">
        <span
          className={`${
            item.status === "new" ? "bg-green-600" : "bg-orange-800"
          } rounded-full inline-block w-full text-white px-3 py-1`}
        >
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/ticket-detail/${item._id}`}
          className="bg-slate-400 border text-white w-full inline-block py-1 rounded-full "
        >
          View Detail
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
