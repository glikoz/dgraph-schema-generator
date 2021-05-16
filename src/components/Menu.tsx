import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

function Menu() {
  let [toggleMenu, setToggleMenu] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="flex-col pb-4">
      <div className="flex w-full justify-between py-3 bg-green-500">
        <div className="lg:pr-0 flex text-white self-center items-center">
          <p className="flex text-start ml-2 ">Dgraph Schema Generator</p>
        </div>
        <div className="flex lg:pr-0 xl:flex lg:flex text-white text-sm justify-end items-end mr-4">
          <p className="self-center mx-4 font-semibold">Github</p>
          <FaGithub
            size="20"
            className=""
            onClick={() =>
              window.location.replace(
                "https://github.com/glikoz/dgraph-schema-generator"
              )
            }
          />
        </div>
      </div>

      <div className="flex  xl:flex lg:flex lg:pb-2 lg:px-10 lg:mt-6 mt-2">
        <button onClick={() => setToggleMenu(!toggleMenu)} className="h-full">
          <MdMenu size="25" className="block lg:hidden  self-center ml-2" />
        </button>
        
      </div>
    </div>
  );
}

export default Menu;
