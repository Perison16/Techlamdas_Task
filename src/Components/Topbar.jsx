import React from 'react';
import { IoNotificationsOutline  } from "react-icons/io5"
const Topbar = () => {
  return (
      <>
        
          <div className="topbar">
            <h2>Student View</h2>
              <div className="notification-wrapper">
                <IoNotificationsOutline  className="notification-icon" />
                <span className="notification-dot"></span>
              </div>
          </div>
       
      </>  
  );
};

export default Topbar;
