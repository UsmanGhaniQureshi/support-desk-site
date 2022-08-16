import LinkButton from "../components/LinkButton";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full">
      <div className="p-2 md:p-0">
        <div className="text-center text-sm md:text-3xl font-bold font-serif p-10 space-y-3">
          <h1>How can we Assit You ?</h1>
          <h1 className="text-zinc-500">Please choose an option from below</h1>
        </div>
      </div>
      <div className="flex p-2 flex-col gap-2">
        <LinkButton
          linkText="Create A New Ticket"
          url="create-ticket"
          className=" bg-black border-2  text-white text-center rounded-md py-1 text-xs font-bold"
        >
          <FaQuestionCircle />
        </LinkButton>
        <LinkButton
          linkText="View All Tickets"
          url="tickets"
          className="border-2 rounded-md py-1  text-xs font-bold"
        >
          <FaTicketAlt />
        </LinkButton>
      </div>
    </div>
  );
};

export default Home;
