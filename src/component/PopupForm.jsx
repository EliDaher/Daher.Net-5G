import React from "react";
import { ref, set, push, get } from "firebase/database";
import { database } from '../firebaseConfig';

function PopupForm({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();

   
  // البيانات المرسلة من النموذج
    const formData = {
      Name: document.getElementById("name").value,
      Contact: document.getElementById("contactNumber").value,
      SubscriptionSpeed: document.getElementById("speed").value,
      MonthlyFee: document.getElementById("MonthlyFee").value,
      userIp: document.getElementById("userIp").value,
      UserName: document.getElementById("userName").value,
      Password: document.getElementById("password").value,
      location: document.getElementById("location").value,
      sender: document.getElementById("sender").value,
    };

    // إرسال البيانات إلى Firebase
    const dbRef = ref(database, "Subscribers");
    const snapshot = await get(dbRef);
    const subscriberCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
    const subscriberId = subscriberCount + 1; // تعيين id جديد بناءً على العدد + 1

    // إضافة id إلى البيانات
    formData.id = subscriberId;
    const newDataRef = ref(database, `Subscribers/${subscriberId}`);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative rtl">
        <button
          className="absolute top-2 left-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
          اضافة اشتراك جديد
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              الاسم
            </label>
            <input
                tabIndex={1}
              type="text"
              id="name"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              رقم الاتصال
            </label>
            <input
                tabIndex={2}
              type="number"
              id="contactNumber"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4 flex gap-2">
            <div>
              <label
                htmlFor="MonthlyFee"
                className="mr-1 block text-sm font-medium text-gray-700 text-right"
                >
                الفاتورة الشهرية
              </label>
              <input
                tabIndex={4}
                type="number"
                id="MonthlyFee"
                required
                className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>
            <div>
              <label
                htmlFor="speed"
                className="mr-1 block text-sm font-medium text-gray-700 text-right"
                >
                سرعة الاشتراك
              </label>
              <input
                tabIndex={3}
                type="number"
                id="speed"
                required
                className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="userIp"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              User IP
            </label>
            <input
              tabIndex={5}
              type="text"
              id="userIp"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              اسم المستخدم
            </label>
            <input
              tabIndex={6}
              type="text"
              id="userName"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mr-1 block text-sm font-medium text-gray-700 text-right"
            >
              كلمة السر
            </label>
            <input
              tabIndex={7}
              type="password"
              id="password"
              required
              className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
            />
          </div>
          <div className="mb-4 flex gap-2">
            <div className="">
              <label
                htmlFor="location"
                className="mr-1 block text-sm font-medium text-gray-700 text-right"
              >
                الموقع
              </label>
              <input
                tabIndex={9}
                type="text"
                id="location"
                required
                className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>
            <div className="">
              <label
                htmlFor="sender"
                className="mr-1 block text-sm font-medium text-gray-700 text-right"
              >
                المرسل
              </label>
              <input
                tabIndex={8}
                type="text"
                id="sender"
                required
                className="focus:outline-primary mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-right"
              />
            </div>
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
                className="ml-auto bg-red-500 text-white hover:text-white"
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

export default PopupForm;
