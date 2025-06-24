import React, { useEffect, useState } from "react";
import BalanceTable from "../component/BalanceTable";
import { database } from '../firebaseConfig';
import { ref, get, child, update } from "firebase/database";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import AddBalanceForm from "../component/AddBalanceForm";
import EmployeeBalanceTotal from "../component/EmployeeBalanceTotal";


export default function EmployeeBalance(){
    const { user } = useAuth();
    const [BalanceTableData, setBalanceTableData] = useState([]);
    const [searchedTable, setSearchedTable] = useState([]);
    const [Total, setTotal] = useState(0);
    const [searchText, setSearchText] = useState("");

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
            const response = await axios.post("https://server-uvnz.onrender.com/getEmployeeBalance", {username: user.username} );

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

    useEffect(()=>{
        searchForRows()
    }, [searchText])

    const searchForRows = () => {
        const searchedTable = BalanceTableData.filter(entry => 
            entry.details.some(detail => 
                Object.values(detail).some(value => 
                    typeof value === "string" && value.includes(searchText)
                )
            )
        );
        setSearchedTable(searchedTable);
    };
    

    return<>
        <div className="w-full" dir="rtl">
            <form dir="ltr" className="flex flex-wrap justify-center mx-auto my-2 select-none">
                <input
                  type="text"
                  placeholder="بحث برقم الهاتف"
                  className="p-1 rounded-l-lg w-60 text-center text-text-900 shadow-md outline-none border border-primary-500"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
                <button 
                className="p-2 rounded-r-lg bg-primary-500 text-white font-bold"
                >بحث</button>
            </form>

            <BalanceTable loading={loading} dataTable={searchText.length > 0 ? searchedTable : BalanceTableData}/>

           <EmployeeBalanceTotal setPayOrInv={setPayOrInv} openAddBalanceForm={openAddBalanceForm} Total={Total}/>
           {/* <div className="bg-accent-500 m-3 mt-10 p-5 rounded text-center text-3xl font-black hover:bg-accent-600">
                انهاء اليومية
            </div>*/}
        </div>
        <AddBalanceForm payOrInv={payOrInv} isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />

    </>
}