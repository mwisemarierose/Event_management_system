import React from "react";
import logo from "../assets/events.png";
import { IoMdSearch } from 'react-icons/io';

function Header() {
   
    return (
        <>
            <div className=" w-full">
                <div className="relative w-full mt-60 ">
                    <img
                        className="w-full h-96 object-cover"
                        src={logo}
                        alt="homeimage"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <div className="flex flex-col text-white justify-center items-center absolute top-[39%] left-[35%]">
                    <h1 className=" text-5xl font-semibold mb-12">Explore Networking Events</h1>
                    <div className=" space-x-6 h-5 flex flex-row">
                        <input
                            className=" bg-transparent font-semibold h-16 w-96 text-white text-2xl px-4 border-2 py-2 hover:bg-transparent"
                            type="text"
                            placeholder="Search for events"
                        />
                          <IoMdSearch className="mr-2 text-6xl bg-white text-gray-600" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
