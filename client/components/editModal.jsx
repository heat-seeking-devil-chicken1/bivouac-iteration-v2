// import {Modal, Button} from 'antd';
// import React, {useState} from 'react';


// const EditModal = ({ title, date, type, location, distance, difficulty, crowds, notes, id }) => {
//  const [isModalVisible, setIsModalVisible] = useState(false);

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

// return (
// <div>
//     {/* <Button type="primary" onClick={showModal}>
//       Edit Hike
//     </Button> */}
//     <Modal title="Edit Hike" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
//           <div className="signupScreen-container">
//           <h1>Add your hike</h1>
//           <input className="newHikeInputs" type="text" id="title" name="title" placeholder="Title" required />Title
//           <input className="newHikeInputs" type="text" id="location" name="location" placeholder="Zion National Park" required />Location
//           <textarea className="newHikeInputs" id="notes"></textarea>
//           <select name="hikeType" id="hikeType">
//             <option value="dayHike">Day Hike</option>
//             <option value="thruHike">Thru-Hike</option>
//             <option value="sectionHike">Section Hike</option>
//             <option value="summitHike">Summit Hike</option>
//             <option value="sectionHike">Section Hike</option>
//           </select>
//           <input className="newHikeInputs" id="date" type="date" />
//           <input className="newHikeInputs" type="number" id="distance" name="distance" placeholder="10" required />
//           <input type="range" min="1" max="10"  className="slider newHikeInputs" id="difficulty" /> Difficulty
//           <input type="range" min="1" max="10" className="slider newHikeInputs" id="crowds" /> Crowds

//         </Modal>
//       </div>
// </div>

// )
// }
// export default EditModal;