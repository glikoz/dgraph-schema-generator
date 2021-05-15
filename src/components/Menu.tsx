import React, { useEffect, useState } from "react";
import {
    useHistory
} from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

function Menu() {
    const history = useHistory();
    let [toggleMenu, setToggleMenu] = useState(true);

    useEffect(() => {

    }, []);

    return (
        <div className="flex-col shadow-md pb-2 lg:pb-4 pb-4">
            <div className="flex w-full justify-between py-3 bg-green-500 mb-8 md:mb-0">
                <div className="lg:pr-0 flex text-gray-700 self-center items-center">
                    <p className="flex text-start ml-2 "> Demo Starter</p>
                </div>
                <div className="flex lg:pr-0 xl:flex lg:flex text-gray-700 text-sm justify-end items-end mr-4">
                    <p className="self-center mx-4 ">Github</p>
                    <FaGithub size="20" className="" />
                </div>
            </div>

            <div className="flex  xl:flex lg:flex lg:pb-2 lg:px-10 lg:mt-8 mt-2">
                <button onClick={() => setToggleMenu(!toggleMenu)} className="h-full">
                    <MdMenu size="25" className="block lg:hidden  self-center ml-2" />
                </button>
                <button
                    onClick={() => history.push("/")}
                    className="text-lg md:text-4xl  lg:ml-4 lg:ml-0 self-center ml-4">
                    graphql schema generator
                </button>
            </div>
            {
                toggleMenu &&
                <div className="flex  flex-col lg:flex-row lg:pb-2 lg:ml-4  md:space-x-8 lg:px-10  mt-8 items-start ml-4 space-y-2 lg:space-y-0">
                    <a onClick={() => history.push({
                        pathname: `/`
                    })} className="text-gray-300">Homepage</a>
                    <a onClick={() => history.push({
                        pathname: `/secondpage`
                    })} className="text-gray-300">SecondPage</a>
                    <a onClick={() => history.push({
                        pathname: `/thirdpage`
                    })} className="text-gray-300">ThirdPage</a>
                </div>
            }

        </div >
    );
}

export default Menu;
