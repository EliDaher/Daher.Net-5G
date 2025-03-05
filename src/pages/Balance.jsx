import { useState } from "react";
import EmployeeBalance from "./EmployeeBalance";
import BalanceTable from "../component/BalanceTable";

export default function Balance() {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center w-screen h-full">
            <div className="relative w-full h-full [perspective:100px]">
                {/* Flip Button */}
                <button 
                    className="absolute top-2 right-1 px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 z-10"
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    Flip
                </button>
                <div className="flex justify-center bg-primary-700 p-2 text-white font-bold text-lg">
                    <h1 className="text-center">{!isFlipped ? 'المحل' : 'فضائي'}</h1>
                </div>

                {/* Flip Container */}
                <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>  
                    {/* Front Side */}
                    <div className="absolute w-full h-full shadow-lg shadow-primary-800 rounded-xl flex flex-col [backface-visibility:hidden]">
                        <div className="flex flex-col" dir="rtl">
                            <BalanceTable />

                            <div className="flex gap-3 items-center justify-around border border-primary-900 m-1 py-3 rounded-lg">
                                <div className="flex flex-col flex-wrap h-24 gap-2">
                                    <span>صندوق ايلي : 9,999,999</span>
                                    <span>صندوق ايلي : 9,999,999</span>
                                    <span>صندوق ايلي : 9,999,999</span>
                                    <span>صندوق ايلي : 9,999,999</span>
                                    <span>صندوق ايلي : 9,999,999</span>
                                </div>
                                <div className="flex flex-col h-full justify-center">
                                    <span className="text-center mb-10">الرصيد الحالي : <strong>999,999</strong></span>
                                    <div className="flex gap-3 px-2">
                                        <button className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600">اضافة الى رصيد</button>
                                        <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">دفع من رصيد</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute w-full h-full shadow-lg shadow-primary-800 rounded-xl bg-text-100 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <h1>فضائي</h1>
                    </div>

                </div>
            </div>
        </div>
    );
}
