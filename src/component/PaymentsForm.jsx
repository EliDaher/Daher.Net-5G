import React, { useState } from "react";
import { ref, set, push, get } from "firebase/database";
import { database } from '../firebaseConfig';

function PaymentsForm({ isOpen, onClose, onSubmit, SubscriberID}) {
  if (!isOpen) return null;
  const [today,setToday] = useState(new Date().toISOString().split('T')[0]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // إرسال البيانات إلى Firebase
    const dbRef = ref(database, "Payments");
    const snapshot = await get(dbRef);
    const subscriberCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    const PaymentID = subscriberCount + 1; // تعيين id جديد بناءً على العدد + 1
    
    // البيانات المرسلة من النموذج
    const formData = {
        Amount: document.getElementById("Amount").value,
        Date: document.getElementById("Date").value,
        Details: document.getElementById('Details').value,
        PaymentID: PaymentID,
        SubscriberID: SubscriberID,
    };

    // إضافة id إلى البيانات
    formData.id = PaymentID;
    const newDataRef = ref(database, `Payments/${PaymentID}`);
    await set(newDataRef, formData);

    set(newDataRef, formData)
    .then(() => {
      console.log("Data added successfully!");
      onClose(); // إغلاق النموذج بعد الإرسال
    })
    .catch((error) => {
      console.error("Error adding data:", error);
    });

    onSubmit();
    onClose();
    
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
          اضافة دفعة للمشترك
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="Amount"
              className="mr-1 block text-sm font-medium text-gray-700"
            >
              القيمة
            </label>
            <input
                tabIndex={1}
              type="number"
              id="Amount"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Date"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              تاريخ الدفع
            </label>
            <input
              tabIndex={2}
              type="Date"
              id="Date"
              required
              onChange={(e) => {setToday(e.target.value)}}
              value={today}
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentsForm;
