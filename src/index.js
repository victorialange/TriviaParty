import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. 
export default function ArrowDown({
  size = 18, // or any default size of your choice
  color = "black" // or any color of your choice
}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" 
    width={size}  // added size here
    height={size} // added size here
    fill={color} // added color here
    >
      <path d="M318 334.5c3.8 8.8 2 19-4.6 26l-136 144c-4.5 4.8-10.8 7.5-17.4 7.5s-12.9-2.7-17.4-7.5l-136-144c-6.6-7-8.4-17.2-4.6-26S14.4 320 24 320h88l0-288c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32l0 288h88c9.6 0 18.2 5.7 22 14.5z"/>
    </svg>

  )
}

export function ArrowUp({
  size = 18, // or any default size of your choice
  color = "black" // or any color of your choice
}) {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
    width={size}  // added size here
    height={size} // added size here
    fill={color} // added color here
    >
      <path d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192h88l0 288c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32l0-288h88c9.6 0 18.2-5.7 22-14.5z"/>
    </svg>
  )
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
