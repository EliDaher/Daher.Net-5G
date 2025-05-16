import React, { useState } from "react";
import UsersList from "../component/UsersList";
import PopupForm from "../component/PopupForm";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebaseConfig";
import { getDatabase, ref, push, get, update } from "firebase/database";


function Dashboard() {

  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleFormSubmit = () => {
    closeModal(); // إغلاق النموذج بعد الإرسال
  };

  if (!user.role.includes("admin") && !user.role.includes("dealer")) {
    return <div className='mt-52 m-auto'>عذرا لا تملك صلاحية للدخول</div>;
  }

  return (
    <>
      {/* قائمة المستخدمين */}
      <UsersList />

      {/* زر إضافة مستخدم جديد */}
      <button onClick={openModal} className={` ${user.role == "dealer" ? `hidden` : `block`} absolute bottom-3 right-5 p-2 bg-accent-500 rounded-full border-solid border-4 border-indigo-600 hover:border-primary-300 border-primary-800 shadow-lw shadow-primary-900 transition-all`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" className="fill-primary-800 hover:fill-primary-300"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      </button>
      <button onClick={ async ()=>{
         try {
          const subscribersRef = ref(database, "Subscribers");
          const invoicesRef = ref(database, "Invoices");
        
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, "0");
          const invoiceDate = `${year}-${month}-01`;
        
          const snapshot = await get(subscribersRef);
          const subscribers = snapshot.val();
        
          if (!subscribers) {
            console.log("⚠️ لا يوجد مشتركين!");
            return;
          }
        
          const updates = {};
        
          console.log("📌 بيانات المشتركين:", subscribers);
          Object.keys(subscribers).forEach((userId) => {
            const subscriber = subscribers[userId];

            if (subscriber.MonthlyFee) {
              const invoiceId = push(invoicesRef).key;
              if (!invoiceId) {
                console.error("❌ خطأ في إنشاء معرف الفاتورة!");
                return;
              }
        
              updates[`Invoices/${invoiceId}`] = {
                Amount: String(subscriber.MonthlyFee),
                Date: invoiceDate,
                Details: `فاتورة شهر ${month}`,
                InvoiceID: invoiceId,
                SubscriberID: String(userId),
                id: invoiceId,
              };
            }
          });

          await update(ref(database), updates);
          console.log("✅ تم إنشاء الفواتير بنجاح!");
        
        } catch (error) {
          console.error("❌ خطأ أثناء إنشاء الفواتير:", error.message, error.stack);
        }
      }} className={` ${user.username == "elidaher" || user.username == "andreh" ? `block` : `hidden`} absolute bottom-3 right-20 p-2 bg-accent-500 rounded-full border-solid border-4 border-indigo-600 hover:border-primary-300 border-primary-800 shadow-lw shadow-primary-900 transition-all text-primary-800 font-bold`}>
        اصدار فاتورة
      </button>

      {/* نافذة النموذج */}
      <PopupForm isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
    </>
  );
}

export default Dashboard;
