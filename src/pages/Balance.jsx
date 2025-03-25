import { useEffect, useState } from "react";
import BalanceTable from "../component/BalanceTable";
import axios from "axios";
import { io } from "socket.io-client";
import AddBalanceForm from "../component/AddBalanceForm";
import WifiBalanceTable from "../component/WifiBalanceTable";
import WifiTotalForm from "../component/WifiTotalForm";

const socket = io("https://server-xwsx.onrender.com", {
    transports: ["websocket", "polling"],
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
});

export default function Balance() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(false);
    const [TotalByEmployee, setTotalByEmployee] = useState([]);
    const [total, setTotal] = useState(0);
    const [EmployeeTotal, setEmployeeTotal] = useState(0);
    const [everyBalanceTable, setEveryBalanceTable] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [payOrInv, setPayOrInv] = useState("pay");

    const closeModal = () => setIsOpen(false);
    const openAddBalanceForm = () => setIsOpen(true);
    
    useEffect(() => {
        socket.on("connect", () => console.log("WebSocket Connected!"));
        socket.on("disconnect", (reason) => console.error("WebSocket Disconnected:", reason));
        socket.on("update-employee-totals", (totalsByEmployee) => setTotalByEmployee(totalsByEmployee));

        return () => {
            socket.off("update-employee-totals");
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    useEffect(() => {
        const getBalanceData = async () => {
            try {
                const response = await axios.post("https://server-xwsx.onrender.com/getEmployeesFund");
                setTotalByEmployee(response.data.TotalFund);
            } catch (err) {
                console.error(err);
            }
        };
        getBalanceData();
    }, []);

    useEffect(() => {
        const getFinalBalance = async () => {
            try {
                setLoading(true);
                const response = await axios.post("https://server-xwsx.onrender.com/getEveryBalance");
                setEveryBalanceTable(response.data.everyBalance);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getFinalBalance();
    }, []);

    useEffect(() => {
        const employeeTotal = TotalByEmployee.reduce((acc, ele) => acc + Number(ele.total || 0), 0);
        setEmployeeTotal(employeeTotal);
    }, [TotalByEmployee]);

    useEffect(() => {
        const totalAmount = everyBalanceTable.reduce((acc, ele) => acc + Number(ele.total || 0), 0);
        setTotal(EmployeeTotal + totalAmount);
    }, [everyBalanceTable, EmployeeTotal]);

    return (
        <>
            <div className="relative flex flex-col items-center justify-center w-screen h-full">
                <div className="relative w-full h-full [perspective:100px]">
                    <button 
                        className="absolute top-2 right-1 px-3 py-1 bg-primary-500 text-white rounded-lg hover:bg-primary-600 z-10"
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        Flip
                    </button>
                    <div className="flex justify-center bg-primary-700 p-2 text-white font-bold text-lg">
                        <h1 className="text-center">{!isFlipped ? 'المحل' : 'فضائي'}</h1>
                    </div>

                    <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}>  
                        <div className="absolute w-full h-full shadow-lg shadow-primary-800 rounded-xl flex flex-col [backface-visibility:hidden]">
                            <div className="flex flex-col md:flex-row" dir="rtl">
                                <BalanceTable loading={loading} allBalanceTable={everyBalanceTable} />
                                <div className="flex md:flex-col gap-3 items-center justify-around border border-primary-900 m-1 py-1 rounded-lg">
                                    <div className="w-2/3 flex flex-col flex-wrap overflow-x-scroll items-center h-28 md:h-full gap-2 scrollbar-x-sm">
                                        {TotalByEmployee.length > 0 ? 
                                            TotalByEmployee.map((ele, index) => (
                                                <span key={index}>{ele.employee} : {ele.total}</span>
                                            )) : <></>
                                        }
                                    </div>
                                    <div className="w-1/3 md:w-64 flex flex-col h-full justify-center items-center">
                                        <span className="text-center mb-5">الرصيد الحالي : <strong>{total}</strong></span>
                                        <div className="flex gap-3 px-2">
                                            <button
                                                onClick={() => { setPayOrInv("pay"); openAddBalanceForm(); }} 
                                                className="p-1 px-3 bg-primary-500 text-white rounded hover:bg-primary-600"
                                            >قبض</button>
                                            <button 
                                                onClick={() => { setPayOrInv("Inv"); openAddBalanceForm(); }} 
                                                className="p-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                                            >دفع</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     {
                        <div className="absolute w-full h-full shadow-lg shadow-primary-800 md:flex-row flex-col gap-1 justify-center  [backface-visibility:hidden] [transform:rotateY(180deg)]">
                            <div className="w-full h-80 overflow-auto scrollbar-sm border border-primary-500">
                                <WifiBalanceTable/>
                            </div>
                            <div className="w-full h-80 mt-2">
                                <WifiTotalForm/>
                            </div>
                                
                        </div>
                     }
                    </div>
                </div>
            </div>
            <AddBalanceForm payOrInv={payOrInv} isOpen={isOpen} onClose={closeModal} mahal={true} />
        </>
    );
}
