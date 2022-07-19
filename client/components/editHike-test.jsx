// import React, { useState } from "react";
// import Modal from "react-modal";
// import AddHikeScreen from "../screens/addHikeScreen";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// Modal.setAppElement("#root");

// const EditHike = ({
//     id, title, date, type, location, distance, difficulty, crowds, notes
// }) => {
//   let subtitle;

//   const [modalIsOpen, setIsOpen] = useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     subtitle.style.color = "#f00";
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   return (
//     <span className="mx-2">

//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         contentLabel="Edit hike"
//         style={customStyles}
//       >
//         <h4 className="fs-4">Edit hike</h4>
//         <AddHikeScreen
//         id = {id}
//         title = {title}
//         date = {date}
//         type = {type}
//         location = {location}
//         distance = {distance}
//         difficulty = {difficulty}
//         crowds = {crowds}
//         notes = {notes}
//         />
//         <button onClick={closeModal}>
//           Cancel
//         </button>
//       </Modal>
//     </span>
//   );
// };

// export default EditHike;