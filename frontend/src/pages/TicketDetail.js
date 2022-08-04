import { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import Note from "../components/Note";

const TicketDetail = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notesArray, setNotesArray] = useState([]);
  const { ticketID } = useParams();

  const [notes, setNotes] = useState(["Problem 1"]);

  useEffect(() => {
    console.log(ticketID);
  }, [ticketID]);

  const addNoteHandler = (note) => {
    setNotes([...notes, note]);
    setIsModalOpen(false);
  };
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
        <p>Ticket ID : 1213231</p>
        <p>
          Date Submited :
          {new Date().toLocaleDateString() +
            ", " +
            new Date().toLocaleTimeString()}
        </p>
        <p>Product : macBook Pro</p>
        <div className="w-full border mt-2 border-slate-800" />
      </div>

      <div className="border mt-4 border-slate-900 p-2 bg-slate-100 rounded-sm">
        <h1 className="text-slate-900">Description of the Issue</h1>
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
        <Note key={note} note={note} />
      ))}
      <button className="w-full text-center mt-8 border-black text-white bg-red-900  items-center border px-5 font-bold py-1 text-sm rounded-md">
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
