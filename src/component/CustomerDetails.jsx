import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, get, child } from "firebase/database";
import PaymentsForm from "./PaymentsForm";
import InvoiceForm from "./InvoiceForm";

function CustomerDetails({id, total}){
  
    const [invoiceIsOpen, setInvoiceIsOpen] = useState(false);
    const closeInvoiceModal = () => setInvoiceIsOpen(false);
    const openInvoiceModal = () => setInvoiceIsOpen(true);  
    const handleInvoiceSubmit = () => {
      closeInvoiceModal(); // إغلاق النموذج بعد الإرسال
    };

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModalPay = () => setIsOpen(true);  
    const handleFormSubmit = () => {
      closeModal(); // إغلاق النموذج بعد الإرسال
    };

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch data from Firebase Realtime Database
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const dbRef = ref(database);
          const snapshot = await get(child(dbRef, `Subscribers/${id}`));
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUser(data); // تخزين البيانات مباشرة
          } else {
            console.log("No data available");
            setError("No data available for this subscriber.");
          }
        } catch (error) {
          setError("Error reading data: " + error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, [id]);
  
    if (loading) {
      return <div className='m-6 w-full'>Loading...</div>;
    }
  
    if (error) {
      return <div className='m-6 w-full'>{error}</div>;
    }

    return<>
      {user ? (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right">
          <p className='text-xl m-1'><strong>اسم المشترك :</strong> {user.Name}</p>
          <div className="flex m-1">
            <p className='text-center text-sm w-1/2 border border-gray-300 rounded p-2 ml-2'><strong>سرعة الاشتراك:</strong> {user.SubscriptionSpeed}</p>
            <p className='text-center text-sm w-1/2 border p-2 border-gray-300 rounded'><strong>العنوان:</strong> {user.location}</p>
          </div>
          <div className="flex m-1">
            <p className='text-center text-sm w-1/2 border border-gray-300 rounded p-2 ml-2'><strong>المرسل:</strong> {user.sender}</p>
            <p className='text-center text-sm w-1/2 border p-2 border-gray-300 rounded'><strong>بيانات الاتصال:</strong> {user.Contact}</p>
          </div>
          <div className="flex m-1">
            <p className='text-center text-sm w-1/2 border border-gray-300 rounded p-2 ml-2'><strong>اسم المستخدم:</strong> {user.UserName}</p>
            <p className='text-center text-sm w-1/2 border p-2 border-gray-300 rounded'><strong>كلمة المرور:</strong> {user.Password}</p>
          </div>
          <div className="flex m-1">
            <p className='text-center text-sm w-1/2 border border-gray-300 rounded p-2 ml-2'><strong> الرصيد</strong> {total}</p>
            <p className='text-center text-sm w-1/2 border p-2 border-gray-300 rounded'><strong>الرسوم الشهرية:</strong> {user.MonthlyFee}</p>
          </div>
          <div className="flex m-1">
            <button onClick={openModalPay} className='text-center text-sm w-1/2 border border-gray-300 rounded p-2 ml-2 bg-green-500 text-white'>اضافة دفعة</button>
            <button onClick={openInvoiceModal} className='text-center text-sm w-1/2 border p-2 border-gray-300 rounded bg-red-500 text-white'>اضافة فاتورة</button>
          </div>
        </div>
      ) : (
        <p>لا توجد بيانات لعرضها.</p>
      )}
      <PaymentsForm SubscriberID={id} isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
      <InvoiceForm SubscriberID={id} invoiceIsOpen={invoiceIsOpen} onClose={closeInvoiceModal} onSubmit={handleInvoiceSubmit} />
    </>
}

export default CustomerDetails;