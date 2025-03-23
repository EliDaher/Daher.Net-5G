import React, { useEffect, useState } from "react";
import CustomerDetails from "../component/CustomerDetails";
import { useParams } from "react-router-dom";
import CustomerPayments from "../component/CustomerPayments";
import CustomerInvoice from "../component/CustomerInvoice";
import { useAuth } from "../context/AuthContext";


function UserPage() {
  const { id } = useParams(); // الحصول على معرف المشترك من الـ URL
  const [total, setTotal] = useState(0);
  const [invoicesVal, setInvoicesVal] = useState(0);
  const [paymentsVal, setPaymentsVal] = useState(0);
  const { user } = useAuth();


  // تحديث القيمة الإجمالية عند تغير الدفعات أو الفواتير
  useEffect(() => {
    setTotal(invoicesVal + paymentsVal);
  }, [invoicesVal, paymentsVal]);

  if (!user.role.includes("admin") && !user.role.includes("dealer")) {
    return <div className='mt-52 m-auto'>عذرا لا تملك صلاحية للدخول</div>;
  }

  return (
    <div dir="rtl" className="m-3 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">تفاصيل المشترك</h1>

      {/* تفاصيل المشترك */}
      <CustomerDetails id={id} total={total} />

      {/* الدفعات والفواتير */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {/* الدفعات */}
        <div className="rounded-lg border shadow-md p-4">
          <h2 className="mb-4 font-bold text-lg">الدفعات</h2>
          <CustomerPayments subscriberID={id} setPaymentsVal={setPaymentsVal} />
        </div>
        {/* الفواتير */}
        <div className="rounded-lg border shadow-md p-4">
          <h2 className="mb-4 font-bold text-lg">الفواتير</h2>
          <CustomerInvoice subscriberID={id} setInvoicesVal={setInvoicesVal} />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
