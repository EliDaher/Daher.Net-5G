import { useState, useEffect } from "react"

export default function WifiBalanceTable(){
    const [payments, setPayments] = useState([])

    const getLast5gBalance = () => {
        fetch("https://server-xwsx.onrender.com/getLast5GBalace")
        .then(response => response.json())
        .then(data => setPayments(data))
        .catch(error => console.error("حدث خطأ:", error));
    }

    useEffect(()=>{
        console.log(getLast5gBalance())
    }, [])

    return<>
        <table className="w-full">
            <thead>
                <tr className="sticky top-0 bg-secondary-900 text-white">
                    <th className="p-1 text-center">الاسم</th>
                    <th className="p-1 text-center">القيمة</th>
                    <th className="p-1 text-center">التفاصيل</th>
                    <th className="p-1 text-center">التاريخ</th>
                </tr>
            </thead>
            <tbody>           
            {
                payments.map((payment, index) => {
                    return <tr key={index} className="bg-text-100 text-secondary-950">
                        <td className="p-1 text-center border border-secondary-200 font-[600]">{payment.name}</td>
                        <td className="p-1 text-center border border-secondary-200 font-[600]">{payment.amount}</td>
                        <td className="p-1 text-center border border-secondary-200 font-[600]">{payment.details}</td>
                        <td className="p-1 text-center border border-secondary-200 font-[600]">{payment.date}</td>
                    </tr>
                })
            }
            </tbody>
        </table>
    </>
}