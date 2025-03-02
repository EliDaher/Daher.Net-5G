import React, { useEffect, useState } from "react";
import BalanceTable from "../component/BalanceTable";
import { database } from '../firebaseConfig';
import { ref, get, child, update } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddBalanceForm from "../component/AddBalanceForm";


export default function EmployeeBalance(){
    const { user } = useAuth();
    const [BalanceTableData, setBalanceTableData] = useState([]);
    const [Total, setTotal] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [payOrInv, setPayOrInv] = useState("pay");
    const closeModal = () => setIsOpen(false);
    const openAddBalanceForm = () => setIsOpen(true);
  
    const handleFormSubmit = () => {
      closeModal(); // إغلاق النموذج بعد الإرسال
    };  

    const [loading, setLoading] = useState(false)


    const getEmployeeBalanceTable = async () => {

        setLoading(true);
        /*setError(null);*/

        try {
            const response = await axios.post("https://server-xwsx.onrender.com/getEmployeeBalance", {username: user.username} );

            setBalanceTableData(response.data.BalanceTable)
        } catch (err) {
            console.error(err);
           // setError("حدث خطأ أثناء البحث.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{

        setTotal(0)
        getEmployeeBalanceTable()

    }, [])

    useEffect(() => {
        const totalAmount = BalanceTableData.reduce((acc, inv) => Number(acc) + Number(inv.amount), 0);
        setTotal(totalAmount);
    }, [BalanceTableData]);

    return<>
        <div className="w-full" dir="rtl">
            <BalanceTable loading={loading} dataTable={BalanceTableData}/>

            <div className="flex h-10 items-center justify-around mt-8">
                <span className="text-center text-xl font-bold">الرصيد الحالي : <strong>{Number(Total)}</strong></span>
                <div className="flex gap-3 px-2">
                    <button onClick={()=>{
                        setPayOrInv("pay")
                        openAddBalanceForm()
                    }} 
                    className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                    >اضافة الى رصيد</button>
                    <button 
                    onClick={()=>{
                        setPayOrInv("inv")
                        openAddBalanceForm()
                    }}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >دفع من رصيد</button>
                </div>
            </div>
           {/* <div className="bg-accent-500 m-3 mt-10 p-5 rounded text-center text-3xl font-black hover:bg-accent-600">
                انهاء اليومية
            </div>*/}
        </div>
        <AddBalanceForm payOrInv={payOrInv} isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />

    </>
}