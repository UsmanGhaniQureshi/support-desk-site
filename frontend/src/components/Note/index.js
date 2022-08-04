const Note = ({ note }) => {
  return (
    <div className="p-2 my-2 bg-slate-200 border rounded-lg ">
      <div className="flex justify-between">
        <h1 className="font-bold">Note From Usman</h1>
        <p>{new Date().toLocaleDateString()}</p>
      </div>
      <p className="mt-2">{note}</p>
    </div>
  );
};

export default Note;
