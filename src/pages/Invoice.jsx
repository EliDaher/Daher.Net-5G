import React, {useEffect, useState} from "react";
import InternetInvoiceTable from "../component/InternetInvoiceTable"
import ElecTable from "../component/ElecTable";
import FinalTableCom from "../component/FinalTableCom";
import ConfirmInvForm from "../component/ConfirmInvForm";
import axios from "axios";


function Invoice(){
    
    const [searchText, setSearchText] = useState({PhNumber: ""});
    const [work, setWork] = useState(false);
    const [internetTotal, setInternetTotal] = useState(0);    
    const [elecTotal, setElecTotal] = useState(0);
    const [phoneTotal, setPhoneTotal] = useState(0);
    const [waterTotal, setWaterTotal] = useState(0);
    const [TotalInvoices, setTotalInvoices] = useState(0);
    const [finalTable, setFinalTable] = useState([]);

    const [elecMatchingRows, setElecMatchingRows] = useState(0);
    const [elecOriginalRows, setElecOriginalRows] = useState(0);
    const [internetMatchingRows, setInternetMatchingRows] = useState(0);
    const [internetOriginalRows, setInternetOriginalRows] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModalPay = () => setIsOpen(true);  
    const handleFormSubmit = () => closeModal();

    const [loading, setLoading] = useState(false);
    

    const clearAllTables = () => {
        setInternetTotal(0)
        setElecTotal(0)
        setWaterTotal(0)
        setPhoneTotal(0)
        setFinalTable([])
    }


    const searchForRows = async () => {
        if (!searchText?.PhNumber) return;

        setLoading(true)

        try {
            const response = await axios.post("https://server-xwsx.onrender.com/search", searchText );

            setElecOriginalRows(response.data.elecOriginalRows)
            setElecMatchingRows(response.data.elecMatchingRows)
            setInternetOriginalRows(response.data.internetOriginalRows)
            setInternetMatchingRows(response.data.internetMatchingRows)
            
        } catch (err) {
            console.error(err);
            //setError("حدث خطأ أثناء البحث.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        setTotalInvoices(Number(internetTotal)+Number(elecTotal)+Number(phoneTotal)+Number(waterTotal))
    }, [internetTotal, elecTotal, phoneTotal, waterTotal])

    return<>
        <div className="flex-col w-full">
            {/* 🔍 حقل البحث */}
            <div className="mb-4 flex flex-wrap justify-center mx-auto my-4 select-none">
                <div className="flex shadow-[0px_0px_4px] shadow-accent-400 mr-5 rounded-lg text-text-950">
                    <button 
                        onClick={()=>{
                            if(finalTable.length > 0){
                                openModalPay()
                            }
                        }}
                        className="text-center text-lg p-2 border-r rounded-l-lg border-text-950 bg-accent-200 hover:bg-accent-300 font-bold">
                        انهاء
                    </button>
                    <div className="text-center text-xl p-2 rounded-r-lg">
                        {TotalInvoices}
                    </div>
                </div>
                <input
                  type="text"
                  placeholder="بحث برقم الهاتف"
                  className="p-2 rounded-l-lg w-60 text-center text-text-900 shadow-md outline-none border border-primary-500"
                  value={searchText.PhNumber}
                  onChange={(e) => {
                    setSearchText({PhNumber: e.target.value});
                  }}
                />
                <button 
                    onClick={()=>{
                        setWork(true)
                        searchForRows()
                        clearAllTables()
                    }}
                    className="p-2 rounded-r-lg bg-primary-500 text-white font-bold"
                >بحث</button>
            </div>
            <InternetInvoiceTable 
                loading={loading}
                internetOriginalRows={internetOriginalRows}
                internetMatchingRows={internetMatchingRows}
                finalTable={finalTable} 
                setFinalTable={setFinalTable} 
                searchText={searchText} 
                work={work} 
                setWork={setWork} 
                internetTotal={internetTotal} 
                setInternetTotal={setInternetTotal}
            />

            <ElecTable 
                loading={loading}
                elecOriginalRows={elecOriginalRows}
                elecMatchingRows={elecMatchingRows}
                finalTable={finalTable} 
                setFinalTable={setFinalTable} 
                searchText={searchText} 
                work={work} 
                setWork={setWork} 
                elecTotal={elecTotal} 
                setElecTotal={setElecTotal}
                phoneTotal={phoneTotal} 
                setPhoneTotal={setPhoneTotal} 
                waterTotal={waterTotal} 
                setWaterTotal={setWaterTotal}
            />

            <div className="w-80 m-auto rounded-lg px-6 py-3">
                <FinalTableCom finalTable={finalTable}></FinalTableCom>
            </div>
            <ConfirmInvForm clearAllTables={clearAllTables} TotalInvoices={TotalInvoices} finalTable={finalTable} isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
        </div>
    </>
}

export default Invoice;