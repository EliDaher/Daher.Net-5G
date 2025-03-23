import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, get, child, update } from "firebase/database";
import PaymentsForm from "./PaymentsForm";
import InvoiceForm from "./InvoiceForm";
import { useAuth } from "../context/AuthContext";


function CustomerDetails({id, total}){
    const [invoiceIsOpen, setInvoiceIsOpen] = useState(false);
    const closeInvoiceModal = () => setInvoiceIsOpen(false);
    const openInvoiceModal = () => setInvoiceIsOpen(true);  
    const handleInvoiceSubmit = () => closeInvoiceModal();

    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);
    const openModalPay = () => setIsOpen(true);  
    const handleFormSubmit = () => closeModal();

    const [Customer, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const dbRef = ref(database);
                const snapshot = await get(child(dbRef, `Subscribers/${id}`));
                if (snapshot.exists()) {
                    setUser(snapshot.val());
                } else {
                    setError("No data available for this subscriber.");
                }
            } catch (error) {
                setError("Error reading data: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    const handleChange = (e) => {
        if(user.role != "dealer"){
            const { name, value } = e.target;
            setUser((prev) => ({ ...prev, [name]: value }));
            update(ref(database, `Subscribers/${id}`), { [name]: value });
        }
    };

    if (loading) return <div className='m-6 w-full'>Loading...</div>;
    if (error) return <div className='m-6 w-full'>{error}</div>;

    return (
        <>
            {Customer ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-right text-text-900">
                    <div className='text-center'>
                      <label className='w-1/3 text-md m-1'><strong>اسم المشترك :</strong></label>
                      <input type="text" name="Name" value={Customer.Name} onChange={handleChange} className='w-2/3 rounded pr-2 outline-none bg-transparent border-b border-primary-200' />
                    </div>
                    
                    <div className="flex m-1">
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label className=''><strong className='whitespace-nowrap'>سرعة الاشتراك:</strong></label>
                            <input type="text" name="SubscriptionSpeed" value={Customer.SubscriptionSpeed} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200' />
                        </div>
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label className='whitespace-nowrap'><strong>العنوان:</strong></label>
                            <input type="text" name="location" value={Customer.location} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                    </div>
                    
                    <div className="flex m-1">
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label><strong className='whitespace-nowrap'>المرسل:</strong></label>
                            <input type="text" name="sender" value={Customer.sender} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label><strong className='whitespace-nowrap'>رقم الاتصال:</strong></label>
                            <input type="text" name="Contact" value={Customer.Contact} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                    </div>
                    
                    <div className="flex m-1">
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label><strong className='whitespace-nowrap'>اسم المستخدم:</strong></label>
                            <input type="text" name="UserName" value={Customer.UserName} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label><strong className='whitespace-nowrap'>كلمة المرور:</strong></label>
                            <input type="text" name="Password" value={Customer.Password} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                    </div>
                    
                    <div className="flex m-1">
                        <p className='text-center text-sm w-1/2 border border-primary-300 rounded p-2 ml-2'><strong> الرصيد:</strong> {total}</p>
                        <div className='w-1/2 p-2 flex gap-1'>
                            <label><strong className='whitespace-nowrap'>الرسوم الشهرية:</strong></label>
                            <input type="text" name="MonthlyFee" value={Customer.MonthlyFee} onChange={handleChange} className='w-full rounded pr-2 outline-none bg-transparent border-b border-primary-200'/>
                        </div>
                    </div>
                    
                    <div className="flex my-2 mx-1">
                        <button onClick={openModalPay} className={` ${user.role == "dealer" ? `hidden` : `block`}  text-center text-md w-1/2 rounded p-2 ml-2 bg-primary-700 text-text-100 font-bold hover:bg-primary-900`}>اضافة دفعة</button>
                        <button onClick={openInvoiceModal} className={` ${user.role == "dealer" ? `hidden` : `block`} text-center text-md w-1/2 p-2 rounded bg-accent-500 text-text-950 font-bold hover:bg-accent-700`}>اضافة فاتورة</button>
                    </div>
                </div>
            ) : (
                <p>لا توجد بيانات لعرضها.</p>
            )}
            <PaymentsForm total={total} SubscriberID={id} isOpen={isOpen} onClose={closeModal} onSubmit={handleFormSubmit} />
            <InvoiceForm total={total} SubscriberID={id} invoiceIsOpen={invoiceIsOpen} onClose={closeInvoiceModal} onSubmit={handleInvoiceSubmit} />
        </>
    );
}
export default CustomerDetails;
