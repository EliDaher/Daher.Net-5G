import React, { useState } from "react";
import { ref, set, push, get } from "firebase/database";
import { database } from '../firebaseConfig';
import { useAuth } from "../context/AuthContext";
import axios from "axios";


function WifiForm({ payOrInv, isOpen, onClose }) {
  if (!isOpen) return null;
  const [amount, setAmount] = useState();
  const [customerName, setCustomerName] = useState("");
  const [details, setDetails] = useState("");
  const { user } = useAuth();


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
        
        axios.post("https://server-xwsx.onrender.com/addWifiExpenses", {
            amount: payOrInv == "pay" ? Number(amount) : Number(-amount),
            employee: user.username,
            details: details + " " + customerName
        })
        .then(response => console.log("Response:", response.data))
        .catch(error => console.error("Error:", error.response ? error.response.data : error));
    
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الفاتورة:", error.response?.data || error.message);
    }
  
    onClose();
    
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative rtl">
        <button
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
          {
            payOrInv == "pay"
            ? 'اضافة الى الصندوق'
            : 'دفع من الصندوق'
          }
        </h2>
        <form onSubmit={handleFormSubmit} dir="rtl">
            <div className="mb-4">
                <label
                  htmlFor="Amount"
                  className="mr-1 block text-sm font-medium text-gray-700"
                 >
                  اسم المشترك
                </label>
                <input
                  autoFocus
                  placeholder="عابر"
                  onBlur={(e)=>{
                    (!customerName) ? setCustomerName("عابر") : ""
                  }}
                  value={customerName}
                  onChange={(e) => {setCustomerName(e.target.value)}}
                  tabIndex={1}
                  type="text"
                  id="Amount"
                  required
                  className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
                />
            </div>
            <div className="mb-4">
                <label
                  htmlFor="Amount"
                  className="mr-1 block text-sm font-medium text-gray-700"
                 >
                  القيمة
                </label>
                <input
                  value={amount}
                  onChange={(e) => {setAmount(e.target.value)}}
                  tabIndex={1}
                  type="number"
                  id="Amount"
                  required
                  className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
                />
            </div>
            <div className="mb-4">
                <label
                  htmlFor="Details"
                  className="mr-1 block text-sm font-medium text-gray-700 text-right"
                >
                  تفاصيل
                </label>
                <textarea
                    value={details}
                    onChange={(e) => {setDetails(e.target.value)}}
                    tabIndex={2}
                  type="text"
                  id="Details"
                  required
                  className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                    className="mr-auto bg-red-500 text-white px-4 py-2 rounded-md hover:text-white"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default WifiForm;
