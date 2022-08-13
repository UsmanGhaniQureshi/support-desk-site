import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import Note from "../components/Note";
import { addNote, fetchNotes } from "../store/notes/notesSlice";
import {
  closeTicket,
  getSingleTicket,
  resetTicketDetail,
} from "../store/tickets/ticketSlice";

const TicketDetail = () => {
  const { ticket } = useSelector((state) => state.ticket);
  const { notes } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ticketID } = useParams();

  useEffect(() => {
    if (!user) navigate("/");

    dispatch(resetTicketDetail());
    dispatch(getSingleTicket(ticketID));
    dispatch(fetchNotes(ticketID));
  }, [ticketID, dispatch]);

  const addNoteHandler = (note) => {
    const { name } = user;
    const data = {
      noteText: note,
      noteBy: name,
      ticketID,
    };
    dispatch(addNote(data));
    setIsModalOpen(false);
  };

  const closeTicketHandler = () => {
    dispatch(closeTicket(ticketID));
    navigate("/tickets");
  };

  if (!ticket || notes.length < 0) return <LoadingSpinner />;
  return (
    <div>
      <button
        onClick={() => navigate("/tickets")}
        className="flex gap-2 mt-8 border-black items-center border px-5 font-bold py-1 text-sm rounded-md"
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>
      <div className="mt-4 font-bold">
        <p>Ticket ID :{ticket._id}</p>
        <p>
          Date Submited :
          {" " +
            new Date(ticket.createdAt).toLocaleDateString() +
            " " +
            new Date(ticket.createdAt).toLocaleTimeString()}
        </p>
        <p>Product : {ticket.product}</p>
        <div className="w-full border mt-2 border-slate-800" />
      </div>

      <div className="border mt-4 border-slate-900 p-2 bg-slate-100 rounded-sm">
        <h1 className="text-slate-900">Description of the Issue</h1>
        <p>{ticket.comment}</p>
      </div>
      <h1>Notes</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="flex gap-2 mt-8 border-black text-white bg-slate-900  items-center border px-5 font-bold py-1 text-sm rounded-md"
      >
        <FaPlus />
        <span>Add Note</span>
      </button>
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
      <button
        disabled={ticket.status === "closed" ? true : false}
        onClick={closeTicketHandler}
        className="w-full text-center mt-8 border-black text-white bg-red-900  items-center border px-5 font-bold py-1 text-sm rounded-md"
      >
        Close Ticket
      </button>

      {isModalOpen && (
        <Modal
          onAddNote={addNoteHandler}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TicketDetail;
