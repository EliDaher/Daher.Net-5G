import React, { useEffect, useState } from "react";
import { database } from '../firebaseConfig';
import { ref, get, query, orderByChild, equalTo } from "firebase/database";

const CustomerInvoice = ({ subscriberID, setInvoicesVal }) => {

    async function getPaymentsBySubscriber(subscriberID) {
        try {
          const paymentsRef = ref(database, "Invoices");
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
      sum -= Number(val.Amount)
    })
    setInvoicesVal(Number(sum))

    useEffect(() => {
        async function fetchPayments() {
          const data = await getPaymentsBySubscriber(subscriberID);
          setPayments(data ? Object.values(data) : []);
        }

        fetchPayments();
    }, [subscriberID]);

  return (
    <div className="mt-1 overflow-y-scroll scrollbar-hide">
      <table className="w-full border-collapse text-center">
      <thead className="bg-gray-100">
            <tr>
                <td className="p-1">القيمة</td>
                <td className="p-1">تاريخ الاستحقاق</td>
                <td className="p-1">حالة الدفع</td>
            </tr>
        </thead>
        <tbody>
            {payments.length > 0 ? (
                payments.map((invoice, index) => (
                  <tr className="hover:bg-gray-200"
                  key={index}>
                        <td className="p-1 invoiceValue">
                            {invoice.Amount
                            }
                        </td>           
                        <td className="p-1">
                            {invoice.DueDate}
                        </td>           
                        <td className="p-1">
                            {invoice.Details}
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

export default CustomerInvoice;
