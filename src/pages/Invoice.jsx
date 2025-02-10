import React, {useState} from "react";
import InternetInvoiceTable from "../component/InternetInvoiceTable"


function Invoice(){
    
    const [searchText, setSearchText] = useState({PhNumber: ""});
    const [work, setWork] = useState(false);
    

    return<>
        <div className="flex-col w-full">
            {/* 🔍 حقل البحث */}
            <div className="mb-4 flex justify-center mx-auto my-4">
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
                    onClick={()=>setWork(true)}
                    className="p-2 rounded-r-lg bg-primary-500 text-white font-bold"
                >بحث</button>
            </div>
            <InternetInvoiceTable searchText={searchText} work={work} setWork={setWork}></InternetInvoiceTable>
        </div>
    </>
}

export default Invoice;