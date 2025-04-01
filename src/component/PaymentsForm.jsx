import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function PaymentsForm({ total, isOpen, onClose, onSubmit, SubscriberID }) {
  if (!isOpen) return null;

  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const { user } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const paymentData = {
        amount: Number(amount), // تحويل القيمة إلى رقم
        date: today,
        details: details,
        subscriberID: SubscriberID,
        total: total || 0, // التأكد من أن total ليست undefined
      };

      if (user.role === "dealer") {
        paymentData.dealer = user.username;
      }

      const response = await axios.post(
        "https://server-xwsx.onrender.com/addPayment",
        paymentData
      );

      console.log("Response:", response.data);
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error sending payment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <button
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
          إضافة دفعة للمشترك
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="Amount" className="block text-sm font-medium text-gray-700 text-right">
              القيمة
            </label>
            <input
              tabIndex={1}
              type="number"
              id="Amount"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Date" className="block text-sm font-medium text-gray-700 text-right">
              تاريخ الدفع
            </label>
            <input
              tabIndex={2}
              type="date"
              id="Date"
              required
              value={today}
              onChange={(e) => setToday(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Details" className="block text-sm font-medium text-gray-700 text-right">
              تفاصيل
            </label>
            <textarea
              tabIndex={3}
              id="Details"
              required
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-start">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentsForm;
