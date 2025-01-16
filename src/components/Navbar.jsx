import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [activeState, setActiveState] = useState(null);

  const buttons = ["Home", "Pastes"];

  function handleClick(index) {
    setActiveState(index); // Update active button based on the clicked index
  }

  return (
    <div className="flex flex-row gap-20 absolute top-0 right-0 left-0 border items-center justify-center p-3 bg-blue-700 ">
      {buttons.map((button, index) => (
        <NavLink
          to={button === "Home" ? "/" : "/pastes"} // Dynamically set the link based on the button text
          key={index} // Use index as a key for each NavLink
          onClick={() => handleClick(index)} // Pass the index on click
          className={`text-white text-xl font-bold ${activeState === index ? "text-green-400" : "bg-blue-700"}`} // Apply styles based on the active state
        >
          {button}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
