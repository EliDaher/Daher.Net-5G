import { useEffect, useState } from "react";
import WifiForm from "./WifiForm";
import axios from "axios";

export default function WifiTotalForm() {
    const [total, setTotal] = useState(0);

    const [wifiBalance, setWifiBalance] = useState([]);
    const [wifiPayments, setWifiPayments] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
    const [payOrInv, setPayOrInv] = useState("pay");

    const closeModal = () => setIsOpen(false);
    const openAddBalanceForm = () => setIsOpen(true);

    const getTotal = async () => {
        try {
            const response = await axios.get("https://server-xwsx.onrender.com/getWifiTotal");

            setWifiBalance(response.data.WifiBalance || []);
            setWifiPayments(response.data.WifiPayments || []);

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
        }
    };

    // حساب total بعد تحديث البيانات
    useEffect(() => {
        let tempTotal = 0;

        wifiBalance.forEach(ele => {
            tempTotal += Number(ele.amount);
        });

        wifiPayments.forEach(ele => {
            tempTotal += Number(ele.Amount);
        });

        setTotal(tempTotal);
    }, [wifiBalance, wifiPayments]); // يتم تنفيذ هذا عند تحديث wifiBalance أو wifiPayments

    useEffect(() => {
        getTotal();
    }, []);

    return (
        <>
        <div className="flex-col h-full justify-around items-center">
            <table className="w-full" dir="rtl">
                <thead>
                    <tr className="sticky top-0 bg-secondary-500 text-white">
                        <th className="p-1 text-center">القيمة</th>
                        <th className="p-1 text-center">التفاصيل</th>
                        <th className="p-1 text-center">التاريخ</th>
                    </tr>
                </thead>
                <tbody>           
                {
                    wifiBalance && wifiBalance.map((payment, index) => {
                        return <tr key={index} className="text-secondary-950">
                            <td className="p-1 text-center border border-secondary-200 font-[450]">{payment.amount}</td>
                            <td className="p-1 text-center border border-secondary-200 font-[450]">{payment.details}</td>
                            <td className="p-1 text-center border border-secondary-200 font-[450]">{payment.timestamp}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>

            <div className="flex h-full justify-around items-center">
                <span className="text-center mb-5 p-1">
                    الرصيد الحالي : <strong>{total}</strong>
                </span>
                <div className="flex gap-3 px-2">
                    <button
                        onClick={() => { setPayOrInv("pay"); openAddBalanceForm(); }} 
                        className="p-1 px-3 bg-secondary-500 text-white rounded hover:bg-secondary-600"
                    > قبض الى الصندوق</button>
                    <button 
                        onClick={() => { setPayOrInv("Inv"); openAddBalanceForm(); }} 
                        className="p-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                    >دفع من الصندوق</button>
                </div>
            </div>
            <WifiForm payOrInv={payOrInv} isOpen={isOpen} onClose={closeModal} />
        </div>
        </>
    );
}
