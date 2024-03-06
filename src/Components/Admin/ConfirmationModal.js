import React from 'react';

const ConfirmationModal = ({ show, onHide, onConfirm, actionType }) => {
  // Inline styles for custom modal positioning and animation
  const modalStyle = {
    display: show ? 'block' : 'none', // Control display of the modal
    // Add more styles here if you want to customize further
  };

  // Classnames for backdrop and show/hide animations
  const backdropClass = show ? 'modal-backdrop fade show' : '';
  const modalDisplayClass = show ? 'show d-block' : 'd-none';

  return (
    <>
      {/* Optional: Add a backdrop div here if you want an overlay effect */}
      {show && <div className={backdropClass}></div>}
      <div className={`modal fade ${modalDisplayClass}`} style={modalStyle} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`Confirm ${actionType}`}</h5>
              <button type="button" className="close" aria-label="Close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>{`Are you sure you want to ${actionType.toLowerCase()} this user?`}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={onHide}>Cancel</button>
              <button type="button" className=" btn btn-success" onClick={onConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
