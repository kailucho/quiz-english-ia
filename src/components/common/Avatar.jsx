import React from 'react';

const Avatar = (props) => (
  <svg 
    width="200" 
    height="200" 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-label="Avatar neutro"
    {...props}
  >
    {/* Fondo circular */}
    <circle cx="100" cy="100" r="100" fill="#f2f2f2" />
    {/* Cabeza */}
    <circle cx="100" cy="70" r="30" fill="#cfcfcf" />
    {/* Cuerpo (tronco/espalda) */}
    <rect x="70" y="100" width="60" height="60" rx="10" fill="#cfcfcf" />
  </svg>
);

export default Avatar;
