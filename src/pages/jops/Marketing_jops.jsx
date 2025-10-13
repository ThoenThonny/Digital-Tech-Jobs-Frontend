import { useState } from 'react';

import Marketing_level from '../../joplevel/Marketing_level';

function Marketing_jops() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="w-full h-[300px] bg-blue-50">
                <div className='flex justify-between items-end h-full' style={{ marginInline: "200px" }}>
                    <div>
                        <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                            ទំព័រការងារ<br />Marketing listing
                        </p>
                    </div>
                    <div className="relative inline-block mb-3 text-left">
                    

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
                <Marketing_level/>
            </div>
        </div>
    );
}

export default Marketing_jops;
