import React from 'react'
import { useState } from 'react';
import Optionlevel from '../scrolling/Optionlevel';
import ITlevel from '../../joplevel/ITlevel';
import Design_level from '../../joplevel/Design_level';
function Design_jops() {
    const [open, setOpen] = useState(false);

    return (
        <div className=''>
            <div className="   w-[100%] h-[300px] bg-blue-50">
                
                
            
                
                <div className='flex justify-between items-end h-full mx-[200px]'>
                    <div className=''>
                    <p style={{ fontSize: "30px", fontWeight: "bold" }}>ទំព័រការងារ​<br />Design listing </p>
                    </div>
                    <div className="relative inline-block mb-3 text-left">
                        {/* Button */}
                      

                        {/* Dropdown Menu */}
                        {open && (
                            <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-blue-100">
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-blue-100">
                                            Settings
                                        </button>
                                    </li>
                                    <li>
                                        <button className="block w-full text-left px-4 py-2 hover:bg-blue-100">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            
           
                
            </div>

            <div>
                <Design_level/>
            </div>
            </div>

    )
}

export default Design_jops;
