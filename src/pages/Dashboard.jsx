import React, { useState, useEffect } from 'react';
import { ref, get, child } from "firebase/database";
import { database } from '../firebaseConfig';
import PieChartExample from '../component/PieChartExample';
import BarChartComponent from '../component/BarChartComponent';
import Loading from "../component/Loading"

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [speeds, setSpeeds] = useState([]);
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
          
          // result array
          const resultArr = [];

          // grouping by sender and resulting with an object using Array.reduce() method
          const groupByLocation = usersList.reduce((group, item) => {
            const { sender } = item;
            group[sender] = group[sender] ?? [];
            group[sender].push(1);
            return group;
          }, {});

          // Finally calculating the sum based on the sender array we have.
          Object.keys(groupByLocation).forEach((item) => {
              groupByLocation[item] = groupByLocation[item].reduce((a, b) => a + b);
              resultArr.push({
                'sender': item,
                'congestion': groupByLocation[item]
              })
          })
          
          setUsers(resultArr)

          const speedArr = []
          const groupBySpeed = usersList.reduce((group, item) => {
            const { SubscriptionSpeed } = item;
            group[SubscriptionSpeed] = group[SubscriptionSpeed] ?? [];
            group[SubscriptionSpeed].push(1);
            return group;
          }, {});

          // Finally calculating the sum based on the sender array we have.
          Object.keys(groupBySpeed).forEach((item) => {
            groupBySpeed[item] = groupBySpeed[item].reduce((a, b) => a + b);
            speedArr.push({
                'speed': item,
                'value': groupBySpeed[item] * Number(item)
              })
          })

          setSpeeds(speedArr)
          

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
    return <Loading/>;
  }
  
  if (error) {
    return <div className='m-6'>{error}</div>;
  }
  
  return (
    <>
      <div className="flex flex-wrap w-screen items-center justify-around gap-7 md:gap-5 sm:gap-2 m-3">
        <div className='w-full md:w-2/5 p-3 shadow-[0px_0px_10px_#999] rounded-2xl'>
          <BarChartComponent data={users}></BarChartComponent>
        </div>  
        <div className='w-full md:w-2/5 p-3 shadow-[0px_0px_10px_#999] rounded-2xl'>
          <PieChartExample dataSet={speeds}></PieChartExample>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
