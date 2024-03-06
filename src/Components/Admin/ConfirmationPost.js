import React from 'react';

const ConfirmationModal = ({ show, onHide, onConfirm, title, message }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Confirm</button>
            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
