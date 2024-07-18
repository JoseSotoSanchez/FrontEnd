import React from "react";
import '../../index.css';

export const openModal = id => {
  const modal = document.getElementById(id);

  modal.style.display = "block";
};

export const hideModal = id => {
  const modal = document.getElementById(id);

  modal.style.display = "none";
};

const Modal = ({ children, id }) => {
//   const modalRef = useRef(null);

  return (
    <div
      id={id}
      className="modal"
    >
      <div className=" modal-content max-w-full max-h-full w-auto h-auto absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded p-5 z-20 bg-[#374151]">
        {children}
      </div>
    </div>
  );
};

export default Modal;