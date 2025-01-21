import React, { useEffect, useState } from "react";
import { database } from '../firebaseConfig';
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

const CustomerPayments = ({ subscriberID }) => {

    async function getPaymentsBySubscriber(subscriberID) {
        try {
          const paymentsRef = ref(database, "Payments");
          const q = query(paymentsRef, orderByChild("SubscriberID"), equalTo(subscriberID));
          const snapshot = await get(q);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Payments for SubscriberID:", data);
            return data;
          } else {
            console.log("No payments found for this SubscriberID.");
            return null;
          }
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      }
      
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function fetchPayments() {
          const data = await getPaymentsBySubscriber(subscriberID);
          setPayments(data ? Object.values(data) : []);
        }

        fetchPayments();
    }, [subscriberID]);

  return (
    <div className="mt-1 overflow-y-scroll scrollbar-hide">
      <table className="w-full text-center">
        <thead>
            <tr>
                <td>القيمة</td>
                <td>تاريخ الدفعة</td>
                <td>طريقة الدفع</td>
            </tr>
        </thead>
        <tbody>
            {payments.length > 0 ? (
                payments.map((payment, index) => (
                    <tr 
                    key={index}>
                        <td>
                            {payment.Amount}
                        </td>           
                        <td>
                            {payment.Date}
                        </td>           
                        <td>
                            {payment.Method}
                        </td>           
                </tr>
              ))
            ) : (
                <tr>
                    <td>
                        No Invoice found.
                    </td>
                </tr>
            )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerPayments;
