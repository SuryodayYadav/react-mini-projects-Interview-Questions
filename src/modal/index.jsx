import { useRef } from "react";

const ProtoModal = () => {
  const dialogRef = useRef(null);
  const openDialog = () => {
    dialogRef.current.showModal();
    document.getElementById("click-button").style.display = "none";
  };
  const closeDialog = () => {
    dialogRef.current.close();
    document.getElementById("click-button").style.display = "inline";
  };
  return (
    <div>
      <dialog
        id="pop-up"
        ref={dialogRef}
        onClick={(e) => {
            if(e.target === dialogRef.current){
                dialogRef.current.close()
            }
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <h2>Hi I am the dialog message</h2>
        <p>You are looking for my solution</p>
        <button onClick={closeDialog}>Hide Me</button>
      </dialog>
      <button id="click-button" onClick={openDialog}>
        Click Me
      </button>
    </div>
  );
};
export default ProtoModal;
