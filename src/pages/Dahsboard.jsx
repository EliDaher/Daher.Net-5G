import React, { useState } from "react";
import UsersList from "../component/UsersList";
import PopupForm from "../component/PopupForm";

function Dashboard() {

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleFormSubmit = () => {
    closeModal(); // إغلاق النموذج بعد الإرسال
  };

  return (
    <>
      {/* قائمة المستخدمين */}
      <UsersList />

      {/* زر إضافة مستخدم جديد */}
      <button onClick={openModal} className="absolute bottom-3 right-5 p-2 bg-primary rounded-full border-solid border-4 border-indigo-600 hover:border-primary border-primary900 shadow-lw shadow-primary900 transition-all ">
        <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#3D2500" className=""><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
      </button>

      {/* نافذة النموذج */}
      <PopupForm isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
    </>
  );
}

export default Dashboard;
