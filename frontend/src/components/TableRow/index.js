import { Link } from "react-router-dom";

const TableRow = ({ item }) => {
  return (
    <tr className="border-b hover:bg-slate-100 transition-all duration-200 md:text-base text-xs">
      <td className="p-2 md:px-6 md:py-4 ">
        {new Date(item.createdAt).toLocaleString()}
      </td>
      <td className="p-2 md:px-6 md:py-4">{item.product}</td>
      <td className="p-2 md:px-6 md:py-4">
        <span
          className={`${
            item.status === "new" ? "bg-green-600" : "bg-orange-800"
          } rounded-full inline-block w-full text-white py-1 px-2 md:px-3  md:py-1`}
        >
          {item.status}
        </span>
      </td>
      <td className="p-2 md:px-6 md:py-4">
        <Link
          to={`/ticket-detail/${item._id}`}
          className="bg-slate-400 border text-white w-full inline-block py-1 px-2 rounded-full "
        >
          view
        </Link>
      </td>
    </tr>
  );
};

export default TableRow;
