import React from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`} onClick={onClose}>
      {message}
    </div>
  );
};

export default Notification;