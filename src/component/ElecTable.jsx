import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function ElecTable({ searchText, work, setWork }) {
    const [invoicesData, setInvoicesData] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeElapsed = Date.now();
    const nowDate = new Date(timeElapsed);

    const [thArr, setThArr] = useState([
        "11/24",
        "12/24",
        "1/25",
        "2/25",
        "3/25",
        "4/25",
        "5/25",
        "6/25",
        "7/25",
        "8/25",
        "9/25"
    ]);


    const internetSearch = async () => {
        if (!searchText?.PhNumber) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("https://server-xwsx.onrender.com/elecSearch", searchText );

            if (response.data.elecMatchingRows?.length > 0) {
                setOriginalRows(response.data.originalRows);
                setInvoicesData(response.data.elecMatchingRows);
            } else {
                console.log("No matching rows found.");
                setInvoicesData([]);
            }
        } catch (err) {
            console.error(err);
            setError("حدث خطأ أثناء البحث.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (work && searchText?.PhNumber) {
            internetSearch();
            setWork(false);
        }
    }, [work]);


    
    const updateInternet = (originalRow, colIndex, newValue) => {
        axios.post('https://server-xwsx.onrender.com/update', {
            row: originalRow, // رقم الصف الأصلي
            col: colIndex, // رقم العمود
            value: newValue // القيمة الجديدة
        })
        .then(response => {
            console.log("Data updated successfully:", response.data);
        })
        .catch(error => {
            console.error("Error updating data:", error);
        });
    }














    if (loading) return <div className="flex items-center justify-center"><Loading type={"table"} /></div>;
    if (error) return <div className="m-6 w-full text-red-500">{error}</div>;

    return (
        <div className="shadow-lg p-4 m-3 border rounded-xl bg-white">
            <h2 className="text-center font-bold text-gray-900 text-xl my-4">
                فواتير كهرباء
            </h2>

            <div className="w-full overflow-auto max-h-96 rounded-lg border border-gray-300">
                {invoicesData.length > 0 ? (
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-800 text-white text-center">
                            <tr className="">
                                <th className="border border-gray-600 px-2 py-3">رقم الفاتورة</th>
                                <th className="border border-gray-600 px-4 py-3">رقم الهاتف</th>
                                <th className="border border-gray-600 px-4 py-3">اسم المشترك</th>
                                <th className="border border-gray-600 px-4 py-3">الشركة</th>
                                <th className="border border-gray-600 px-4 py-3">السرعة</th>
                                <th className="border border-gray-600 px-4 py-3">تاريخ التسديد</th>
                                <th className="border border-gray-600 px-4 py-3">الفاتورة الشهرية</th>
                                <th className="border border-gray-600 px-4 py-3">ملاحظات</th>

                                {thArr.map(thText =>{
                                    return(<>
                                        <th className="border border-gray-600 px-4 py-3"></th>
                                        <th className="border border-gray-600 px-4 py-3">{thText}</th>
                                        <th className="border border-gray-600 px-4 py-3"></th>
                                    </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {invoicesData.map((invoice, index) => {
                                const invoiceValues = Object.values(invoice);
                                const totalCells = 41;

                                return (
                                    <tr
                                        key={index}
                                        className="even:bg-gray-100 transition-all duration-200 [&>*:nth-child(8)]:bg-yellow-300 [&>*:nth-child(7)]:bg-green-400 hover:bg-primary-100"
                                        data-key={index}
                                    >
                                        {Array.from({ length: totalCells }, (_, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300">
                                                <input
                                                    type="text"
                                                    value={invoiceValues[cellIndex] || ""}
                                                    onChange={(e) => {
                                                        const updatedInvoices = [...invoicesData];
                                                        updatedInvoices[index] = {
                                                            ...updatedInvoices[index],
                                                            [Object.keys(invoice)[cellIndex] || `field_${cellIndex}`]: e.target.value
                                                        };
                                                        setInvoicesData(updatedInvoices);
                                                    }}
                                                    onBlur={
                                                        (e) => {
                                                           var updateRow = originalRows[e.target.parentElement.parentElement.getAttribute('data-key')]
                                                           var updateCol = cellIndex
                                                           var updateVal = e.target.value

                                                           updateInternet(updateRow,updateCol,updateVal)
                                                        }
                                                    }
                                                    onKeyDown={(e)=>{
                                                        if (e.ctrlKey && e.key === ";" || e.ctrlKey && e.key === "ك") {
                                                            e.currentTarget.value = nowDate.toLocaleDateString('en-US')
                                                        }
                                                    }}
                                                    className="p-1 w-32 bg-transparent outline-none text-center"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500 py-4">لم يتم العثور على أي فواتير.</p>
                )}
            </div>
        </div>
    );
}
