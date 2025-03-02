import { useEffect } from "react"





export default function BalanceTable({loading, dataTable = []}){

    return <>
        <div className={`overflow-y-scroll scrollbar-sm h-[70vh] w-full border border-primary-700 ${loading ? `animate-pulse` : ``}`}>
            <table className="w-full">
                <thead className="h-10 bg-primary-500 text-white sticky top-0">
                    <tr className="border-none">
                        <th className="w-2">#</th>
                        <th>القيمة</th>
                        <th>التاريخ</th>
                        <th>تفاصيل</th>
                    </tr>
                </thead>
                <tbody>
                    { dataTable.map((inv, index) => (
                        <tr key={index} className="even:bg-primary-100 hover:bg-stone-200">
                            <td className="p-2 border border-primary-300 text-center">{index + 1}</td>
                            <td className="p-2 border border-primary-300 text-center">{inv.amount}</td>
                            <td className="p-2 border border-primary-300 text-center">{inv.timestamp}</td>
                            <td className="p-2 border border-primary-300 text-center">
                                {
                                    inv.details.map((invoice, index) => {
                                        return <div key={index} className="flex items-center justify-center gap-3">
                                            <div>{invoice.customerDetails}</div>
                                            <div>/ {invoice.customerName}</div>
                                        </div>
                                    })
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}