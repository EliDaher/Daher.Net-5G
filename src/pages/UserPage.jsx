import React, {useEffect, useState} from 'react';
import CustomerDetails from '../component/CustomerDetails';
import { useParams } from "react-router-dom";
import CustomerPayments from '../component/CustomerPayments'
import CustomerInvoice from '../component/CustomerInvoice'

function UserPage() {

  const [total, setTotal] = useState(0);
  const [invoicesVal, setInvoicesVal] = useState(0);
  const [paymentsVal, setPaymentsVal] = useState(0);
  useEffect(()=>{
    setTotal(invoicesVal + paymentsVal)
  }, [invoicesVal, paymentsVal])
    const { id } = useParams(); 
    return (
    <div dir="rtl" className="m-3 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">تفاصيل المشترك</h1>
        <CustomerDetails id={id} total={total}></CustomerDetails>
        <div className="flex-col">
            <div className='h-1/2 rounded-lg border shadow-md p-2'>
                <h2 className='my-2 font-bold text-lg'>الدفعات</h2>
                <CustomerPayments subscriberID={id} setPaymentsVal={setPaymentsVal}></CustomerPayments>
            </div>
            <div className='h-1/2 rounded-lg border shadow-md p-2'>
                <h2 className='my-2 font-bold text-lg'>الفواتير</h2>
                <CustomerInvoice subscriberID={id} setInvoicesVal={setInvoicesVal}></CustomerInvoice>
            </div>
        </div>
    </div>
  );
}

export default UserPage;
