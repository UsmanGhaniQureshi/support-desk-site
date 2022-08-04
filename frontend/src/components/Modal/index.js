import { useRef } from "react";

import { FaWindowClose } from "react-icons/fa";

const Modal = ({ onAddNote, onClose }) => {
  const noteRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    const note = noteRef.current.value;

    onAddNote(note);
  };

  const handleClose = (e) => {
    if (e.target.id === "Modal") onClose();
  };
  return (
    <div
      id="Modal"
      onClick={handleClose}
      className="flex  justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm"
    >
      <form
        className="bg-slate-200 p-5 flex flex-col w-96 relative gap-3"
        onSubmit={submitHandler}
      >
        <FaWindowClose className="right-5 absolute  top-3" onClick={onClose}/>
        <h1>Add Note</h1>

        <textarea
          ref={noteRef}
          className="outline-none px-2 py-1 rounded-md"
          placeholder="Enter Note"
        />
        <button type="submit" className="bg-black text-white px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Modal;
