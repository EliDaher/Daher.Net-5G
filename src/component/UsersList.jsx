import React, { useState, useEffect } from 'react';
import { ref, get, child } from "firebase/database";
import { database } from '../firebaseConfig';
import UserCard from "../component/UserCard";
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useAuth } from "../context/AuthContext";
import axios from 'axios';


const ITEMS_PER_PAGE = 12; // عدد المستخدمين في كل صفحة

const UsersList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCardView, setIsCardView] = useState(true); // تبديل العرض

  useEffect(() => {
    if(user.role == "admin"){
      const fetchUsersData = async () => {
        try {
          const dbRef = ref(database);
          const snapshot = await get(child(dbRef, 'Subscribers')); 
          if (snapshot.exists()) {
            const data = snapshot.val();
            const usersList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
            setUsers(usersList);
          } else {
            console.log("No data available");
          }
        } catch (error) {
          setError("Error reading data: " + error.message);
        } finally {
          setLoading(false);
        }
      };
      

      fetchUsersData();
    }else{
      const fetchDealerCustomers = async () => {
        try {
          const dealer = user.username;
          const response = await axios.get(`https://server-uvnz.onrender.com/getDealerCustomers`, {
            params: { dealer }
          });
          setUsers(response.data);
        } catch (error) {
          setError(error.response?.data?.error || 'حدث خطأ أثناء جلب البيانات');
        } finally {
          setLoading(false);
        }
      };
      fetchDealerCustomers();
    }
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className='m-6'>{error}</div>;

  // تصفية المشتركين بناءً على البحث
  const filteredUsers = users.filter(user => 
    user.Name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.UserName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // حساب الصفحات
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='p-4 overflow-y-auto h-full scrollbar-hide w-full'>

      {/* 🔍 حقل البحث + تبديل العرض */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="ابحث عن مشترك أو اسم المستخدم..."
          className="p-2 rounded-lg w-80 text-center text-text-950 shadow-md outline-none border border-primary-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* زر التبديل بين العرضين */}
        <button 
          className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-md"
          onClick={() => setIsCardView(!isCardView)}
        >
          {isCardView ? "عرض الجدول" : "عرض البطاقات"}
        </button>
      </div>

      {/* عرض المستخدمين على شكل بطاقات */}
      {isCardView ? (
        <ul className='flex flex-wrap gap-6 items-center justify-center'>
          {selectedUsers.length > 0 ? (
            selectedUsers.map((user, index) => (
              <Link to={`/subscriber/${user.id}`} className="flex flex-col select-none" key={user.id}>
                <li 
                  dir="rtl"
                  className="text-right bg-text-100 flex flex-col flex-1 p-4 rounded-2xl hover:shadow-lg transition-all border border-primary-600 opacity-80"
                >
                  <UserCard 
                    userName={user.Name} 
                    userIndex={startIndex + index + 1} 
                    userSpeed={user.SubscriptionSpeed}
                    userLocation={user.location}
                    userSender={user.sender}
                    userContact={user.Contact}
                    userAccount={user.UserName}
                    userPassword={user.Password}
                    userBalance={user.Balance}
                    userFee={user.MonthlyFee}
                  />
                  <div className='mt-auto text-gray-400 select-none'>{user.id}</div>
                </li>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500"> لا يوجد مشترك بهذا الاسم أو اسم المستخدم</p>
          )}
        </ul>
      ) : (
        // عرض المستخدمين على شكل جدول
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-primary-500 text-white">
                <th className="border p-2">#</th>
                <th className="border p-2">الاسم</th>
                <th className="border p-2">اسم المستخدم</th>
                <th className="border p-2">السرعة</th>
                <th className="border p-2">الرصيد</th>
                <th className="border p-2">الرسوم الشهرية</th>
                <th className="border p-2">تفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers.length > 0 ? (
                selectedUsers.map((user, index) => (
                  <tr key={user.id} className="text-center hover:bg-gray-100 transition-all">
                    <td className="border p-2">{startIndex + index + 1}</td>
                    <td className="border p-2">{user.Name}</td>
                    <td className="border p-2">{user.UserName}</td>
                    <td className="border p-2">{user.SubscriptionSpeed}</td>
                    <td className="border p-2">{user.Balance}</td>
                    <td className="border p-2">{user.MonthlyFee}</td>
                    <td className="border p-2">
                      <Link to={`/subscriber/${user.id}`} className="text-blue-500">عرض</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 p-4">لا يوجد مشترك بهذا الاسم أو اسم المستخدم</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* أزرار التنقل بين الصفحات */}
      {filteredUsers.length > 0 && totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UsersList;
