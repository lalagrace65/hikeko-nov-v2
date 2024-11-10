import React, { useEffect, useState } from 'react'
import { BiSend } from "react-icons/bi";


export default function CustomerMessages() {
    const [ws, setWs] = useState(null);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000');
        setWs(ws);
      }, []);
      
    return (
        <div className="flex h-screen">
            <div className="bg-gray-200 w-1/3">
                contacts
            </div>
            <div className="bg-slate-100 w-2/3">
                <div className='flex-grow'>
                    messages
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder='Type your message here'
                        className=" bg-white flex-grow border rounded-md" />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        <BiSend className='w-5 h-5' />
                    </button>
                </div>
            </div>
        </div>
    );
}
