import React, {useEffect, useState} from "react";
import InternetInvoiceTable from "../component/InternetInvoiceTable"
import ElecTable from "../component/ElecTable";


function Invoice(){
    
    const [searchText, setSearchText] = useState({PhNumber: ""});
    const [work, setWork] = useState(false);
    const [internetTotal, setInternetTotal] = useState(0);    
    const [elecTotal, setElecTotal] = useState(0);
    const [phoneTotal, setPhoneTotal] = useState(0);
    const [waterTotal, setWaterTotal] = useState(0);
    const [TotalInvoices, setTotalInvoices] = useState(0);

    useEffect(()=>{
        setTotalInvoices(Number(internetTotal)+Number(elecTotal)+Number(phoneTotal)+Number(waterTotal))
    }, [internetTotal, elecTotal, phoneTotal, waterTotal])
    

    return<>
        <div className="flex-col w-full">
            {/* 🔍 حقل البحث */}
            <div className="mb-4 flex flex-wrap justify-center mx-auto my-4 select-none">
                <div className="text-center text-xl p-2 shadow mr-5 rounded-lg">
                    {TotalInvoices}
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
                        setInternetTotal(0)
                        setElecTotal(0)
                        setWaterTotal(0)
                        setPhoneTotal(0)
                    }}
                    className="p-2 rounded-r-lg bg-primary-500 text-white font-bold"
                >بحث</button>
            </div>
            <InternetInvoiceTable searchText={searchText} work={work} setWork={setWork} internetTotal={internetTotal} setInternetTotal={setInternetTotal}></InternetInvoiceTable>
            <ElecTable searchText={searchText} work={work} setWork={setWork} elecTotal={elecTotal} setElecTotal={setElecTotal}phoneTotal={phoneTotal} setPhoneTotal={setPhoneTotal} waterTotal={waterTotal} setWaterTotal={setWaterTotal}></ElecTable>
        </div>
    </>
}

export default Invoice;