import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MdHome } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaList } from "react-icons/fa";
function NavigationDrawer() {
  const history = useHistory();

  useEffect(() => {}, []);

  return (
    <div
      className="flex-col items-start justify-start pb-2 lg:pb-4 pt-8 pl-2 rounded-xl mb-20"
      style={{ backgroundColor: "#ffffff", width: "23%" }}
    >
      <div className="flex ml-4">
        <button
          onClick={() => history.push("/")}
          className="text-2xl font-semibold"
        >
          Dgraph Studio
        </button>
      </div>
      <div className="flex flex-col space-y-4 lg:pb-2  lg:mt-6 ml-2 items-start">
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <MdHome size="25" className="mr-2" />
          Home
        </button>
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <FaList size="25" className="mr-2" />
          Nodes
        </button>
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <FaList size="25" className="mr-2" />
          Edges
        </button>
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <GoPlus size="25" className="mr-2" />
          Create Nodes
        </button>
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <GoPlus size="25" className="mr-2" />
          Create Edges
        </button>
        
        <button
          onClick={() => history.push("/")}
          className="text-lg ml-4 text-indigo-500 font-semibold flex"
        >
          <BsFillPeopleFill size="25" className="mr-2" />
          About
        </button>
      </div>
    </div>
  );
}

export default NavigationDrawer;
