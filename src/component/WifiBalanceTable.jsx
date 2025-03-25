import { useState, useEffect } from "react"

export default function WifiBalanceTable(){
    const [payments, setPayments] = useState([])

    const getLast5gBalance = () => {
        fetch("https://server-xwsx.onrender.com/getLast5gBalance")
        .then(response => response.json())
        .then(data => setPayments(data))
        .catch(error => {console.error("حدث خطأ:", error)});
    }

    useEffect(()=>{
        getLast5gBalance()
    }, [])

    return<>
        <table className="w-full" dir="rtl">
            <thead>
                <tr className="sticky top-0 bg-primary-500 text-white">
                    <th className="p-1 text-center">الاسم</th>
                    <th className="p-1 text-center">القيمة</th>
                    <th className="p-1 text-center">التفاصيل</th>
                    <th className="p-1 text-center">التاريخ</th>
                </tr>
            </thead>
            <tbody>           
            {
                payments && payments.map((payment, index) => {
                    return <tr key={index} className="text-primary-950">
                        <td className="p-1 text-center border border-primary-200 font-[450]">{payment.name}</td>
                        <td className="p-1 text-center border border-primary-200 font-[450]">{payment.amount}</td>
                        <td className="p-1 text-center border border-primary-200 font-[450]">{payment.details}</td>
                        <td className="p-1 text-center border border-primary-200 font-[450]">{payment.date}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </>
}