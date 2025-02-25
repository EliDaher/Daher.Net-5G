import React, { useEffect, useState } from "react";
import FinalTableCom from "../component/FinalTableCom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";



function ConfirmInvForm({ clearAllTables, TotalInvoices, finalTable, isOpen, onClose, onSubmit}) {

  if (!isOpen) return null;
  const { user } = useAuth();



 
    
  const [today,setToday] = useState(new Date().toISOString().split('T')[0]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const invoiceData = {
        amount: TotalInvoices, // قيمة الفاتورة
        employee: user.username, // اسم الموظف
        details:  {...finalTable}
      };
  
      const response = await axios.post("https://server-xwsx.onrender.com/addInvoice", invoiceData);
  
      if (response.data.success) {
        console.log("تمت إضافة الفاتورة بنجاح!");
      }
    
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الفاتورة:", error.response?.data || error.message);
    }

    clearAllTables();
    onSubmit();
    onClose();
    
  };

  return (
    <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-6 left-6 text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
              تأكيد الفواتير
            </h2>
            <form onSubmit={handleFormSubmit}>
                <div className="my-8 text-right h-96 overflow-y-scroll">
                    <FinalTableCom finalTable={finalTable}></FinalTableCom>
                </div>
                <h3 className="my-3">المجموع : <strong>{TotalInvoices}</strong></h3>
                <div className="flex justify-start gap-3">
                    <button
                      type="submit"
                      className="bg-primary-500 text-white font-bold px-3 py-1 rounded hover:bg-primary-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={(e)=>{
                        e.preventDefault()
                        console.log(finalTable)
                      }}
                      className="bg-accent-500 text-white font-bold px-3 py-1 rounded hover:bg-accent-600"
                    >
                      Print
                    </button>
                    <button
                      onClick={onClose}
                      className="bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600"
                    >
                      Close
                    </button>
                </div>
            </form>
          </div>
        </div>
    </>
    );
}

export default ConfirmInvForm;
