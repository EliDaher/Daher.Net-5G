import React, { useEffect, useState } from "react";
import { database } from '../firebaseConfig';
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

const CustomerPayments = ({ subscriberID, setPaymentsVal }) => {

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
    var sum = 0;
    payments.map(val =>{
      sum += Number(val.Amount)
    })
    setPaymentsVal(Number(sum))

    useEffect(() => {
        async function fetchPayments() {
          const data = await getPaymentsBySubscriber(subscriberID);
          setPayments(data ? Object.values(data) : []);
        }

        fetchPayments();
    }, [subscriberID]);

  return (
    <>
    <div className="mt-1 overflow-y-scroll scrollbar-hide max-h-36 border rounded-sm">
      <table className="w-full border-collapse text-center">
        <thead className="bg-gray-100 dark:bg-stone-900 sticky top-0">
            <tr>
                <td className="p-1">القيمة</td>
                <td className="p-1">تاريخ الدفعة</td>
                <td className="p-1">التفاصيل</td>
            </tr>
        </thead>
        <tbody>
            {payments.length > 0 ? (
                payments.map((payment, index) => (
                    <tr className="hover:bg-gray-200 even:bg-stone-200  dark:even:bg-stone-600 dark:hover:bg-stone-500"
                    key={index}>
                        <td className="p-1 paymentValue">
                            {payment.Amount}
                        </td>           
                        <td className="p-1">
                            {payment.Date}
                        </td>           
                        <td className="p-1">
                            {payment.Details}
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
    </>
  );
};

export default CustomerPayments;
