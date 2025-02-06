import React, { useState, useEffect } from 'react';
import { ref, get, child } from "firebase/database";
import { database } from '../firebaseConfig';
import UserCard from "../component/UserCard";
import { Link } from 'react-router-dom';
import Loading from './Loading';

const ITEMS_PER_PAGE = 10; // عدد المستخدمين في كل صفحة

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className='m-6'>{error}</div>;
  }

  // حساب الصفحات الكلية
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='p-4 overflow-y-auto h-screen scrollbar-hide w-full'>
      <ul className='flex flex-wrap gap-6 items-center justify-center'>
        {selectedUsers.map((user, index) => (
          <Link to={`/subscriber/${user.id}`} className="flex flex-col select-none" key={user.id}>
            <li 
              dir="rtl"
              className="text-right bg-background-100 flex flex-col flex-1 p-4 rounded-2xl hover:shadow-[0px_0px_14px] hover:shadow-background-500 shadow-[0px_0px_8px] shadow-background-500 transition-all border border-primary-600 opacity-80"
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
                userIp={user.userIp}
                userFee={user.MonthlyFee}
              />
              <div className='mt-auto text-gray-400 select-none'>
                {user.id}
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {/* أزرار التنقل بين الصفحات */}
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
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-primary-500 text-white" : ""}`}
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
    </div>
  );
};

export default UsersList;
