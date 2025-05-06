import React from 'react';
import './CustomAlert.css';

function CustomAlert({ message, onClose, title = 'Araç Takip' }) {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <div className="alert-title">{title}</div>
        <div className="alert-message">{message}</div>
        <div className="alert-buttons">
          <button onClick={onClose}>Tamam</button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlert;
