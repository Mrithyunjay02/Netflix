import React from 'react';

function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
