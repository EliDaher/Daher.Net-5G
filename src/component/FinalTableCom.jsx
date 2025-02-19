
export default function FinalTableCom({finalTable}){
    return <>(
        {finalTable.length > 0 ? 
            <div className="mt-5 text-center" dir="rtl">
                <table className="m-auto">
                    <thead className="">
                        <tr>  
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
                                    <td className="w-10 py-1 px-2">{inv.customerName}</td>
                                    <td className="w-10 py-1 px-2">{inv.customerNumber}</td>
                                    <td className="w-10 py-1 px-2">{inv.customerDetails}</td>
                                    <td className="w-10 py-1 px-2">{inv.invoiceNumber}</td>
                                    <td className="w-10 py-1 px-2">{inv.invoiceValue}</td>
                                </tr>
                            )})
                        }
                    </tbody>
                </table>
            </div>
        : <></>}
    )</>
}