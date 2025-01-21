import React from 'react';
import CustomerDetails from '../component/CustomerDetails';
import { useParams } from "react-router-dom";
import CustomerPayments from '../component/CustomerPayments'
import CustomerInvoice from '../component/CustomerInvoice'

function UserPage() {

    const { id } = useParams(); 
    return (
    <div dir="rtl" className="m-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">تفاصيل المشترك</h1>
        <CustomerDetails id={id}></CustomerDetails>
        <div className="flex-col">
            <div className='h-1/2'>
                <h2 className='my-2 font-bold text-lg'>الدفعات</h2>
                <CustomerPayments subscriberID={id}></CustomerPayments>
            </div>
            <div className='h-1/2'>
                <h2 className='my-2 font-bold text-lg'>الفواتير</h2>
                <CustomerInvoice subscriberID={id}></CustomerInvoice>
            </div>
        </div>
    </div>
  );
}

export default UserPage;
