
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const Deletestudent = ({ student, onClose, onConfirm }) => {
  if (!student) return null;

  return (

    // Delete popup show page 

    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <FaTimesCircle className="close-icon" onClick={onClose} />
            <p className="modal-title">Are you sure you want to delete the Student?</p>
          </div>
          <p className="modal-subtitle">It will permanently remove the Student from DB.</p>
          <div className="modal-actions">

            <button className="delete-btn" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deletestudent;
