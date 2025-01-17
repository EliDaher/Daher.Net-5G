import React, { useState, useEffect } from 'react';
import { ref, get, child } from "firebase/database";
import { database } from '../firebaseConfig';
import UserCard from "../component/UserCard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Subscribers')); // Reference to "users" path
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert the object to an array for easier mapping
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
  }, []); // Empty dependency array ensures this effect runs once when component mounts

  if (loading) {
    return <div className='m-6'>Loading...</div>;
  }

  if (error) {
    return <div className='m-6'>{error}</div>;
  }

  return (
    <div className='p-4 overflow-y-auto h-screen scrollbar-hide'>
      <ul className='flex flex-wrap gap-6'>
        {users.map((user, index) => (
          <li 
            key={user.SubscriberID} 
            className="bg-gray-200 flex-1 min-w-[200px] max-w-[55%] p-6 rounded-2xl hover:shadow-hlw shadow-lw shadow-primary900 transition-all"
          >
            <UserCard 
              userName={user.Name} 
              userIndex={index + 1} 
              userSpeed={user.SubscriptionSpeed}
              userLocation={user.location}
              userSender={user.sender}
              userContact={user.Contact}
              userAccount={user.UserName}
              userPassword={user.Password}
              userIp={user.userIp}
              userFee={user.MonthlyFee}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
