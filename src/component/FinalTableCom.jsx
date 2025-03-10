import React from "react";

export default function FinalTableCom({finalTable}){

   

    return <>
        {finalTable.length > 0 ? 
            <div className="mt-5 text-center" dir="rtl">
                <table className="w-full text-text-900 shadow shadow-primary-900">
                    <thead className="border border-primary-400">
                        <tr className="border border-primary-400">  
                            <th className="w-10 px-2">نوع الفاتورة</th>
                            <th className="w-10 px-2">الاسم</th>
                            <th className="w-10 px-2">الرقم</th>
                            <th className="w-10 px-2">الدورة</th>
                            <th className="w-10 px-2">المبلغ</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {finalTable.map(inv => {return(
                                <tr>  
                                    <td className="w-10 py-1 px-2 border-primary-500">{inv.customerDetails}</td>
                                    <td className="w-10 py-1 px-2 border-primary-500">{inv.customerName}</td>
                                    <td className="w-10 py-1 px-2 border-primary-500">{inv.customerNumber}</td>
                                    <td className="w-10 py-1 px-2 border-primary-500">{inv.invoiceNumber}</td>
                                    <td className="w-10 py-1 px-2 border-primary-500">{inv.invoiceValue}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
        : <></>}
    </>
}