import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function ElecTable({ searchText, work, setWork, elecTotal, phoneTotal, waterTotal, setElecTotal, setPhoneTotal, setWaterTotal }) {
    const [invoicesData, setInvoicesData] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timeElapsed = Date.now();
    const nowDate = new Date(timeElapsed);
    
    const [thArr, setThArr] = useState([
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
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


    
    const updateElec = (originalRow, colIndex, newValue) => {
        axios.post('https://server-xwsx.onrender.com/updateElec', {
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
        <div className="shadow-lg p-4 m-3 border rounded-xl bg-white" dir="rtl">

            <div className="flex justify-between items-center">
                <h2 className="text-right font-bold text-text-950 text-xl my-4 mr-2">
                    فواتير الخدمات الحكومية
                </h2>
                <div className="flex gap-5 items-right">
                    <p className="font-bold text-text-950 p-2 rounded-lg shadow shadow-orange-400">ارضي {phoneTotal}</p>
                    <p className="font-bold text-text-950 p-2 rounded-lg shadow shadow-yellow-400">كهرباء {elecTotal}</p>
                    <p className="font-bold text-text-950 p-2 rounded-lg shadow shadow-blue-400">مياه {waterTotal}</p>
                </div>
            </div>

            <div className="w-full overflow-auto max-h-96 rounded-lg border border-gray-300">
                {invoicesData.length > 0 ? (
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-800 text-white text-center">
                            <tr className="max-h-2 leading-none border-xl border-primary-800">
                                <th className="border border-gray-600 px-2">رقم الفاتورة</th>
                                <th className="border border-gray-600 px-2">نوع الفاتورة</th>
                                <th className="border border-gray-600 px-2"></th>
                                <th className="border border-gray-600 px-2">الرقم</th>

                                {thArr.map(thText =>{
                                    return(<>
                                        <th className="border border-gray-600 bg-primary-800"></th>
                                        <th className="border border-gray-600 px-2">الدورة</th>
                                        <th className="border border-gray-600 px-2">قيمة الفاتورة</th>
                                        <th className="border border-gray-600 px-2">المبلغ المقبوض</th>
                                        <th className="border border-gray-600 px-2">تاريخ الدفع</th>
                                        <th className="border border-gray-600 px-2">ملاحظات</th>
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
                                        className="even:bg-gray-100 transition-all duration-200 [&>*:nth-child(6n-1)>*:nth-child(1)]:w-1 [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 hover:bg-primary-100"
                                        data-key={index}
                                    >
                                        {Array.from({ length: totalCells }, (_, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300">
                                                <input
                                                  type="text"
                                                  value={invoiceValues[cellIndex] || ""}
                                                  onChange={(e) => {
                                                    const updatedInvoices = [...invoicesData];

                                                    if (updatedInvoices[index]) {
                                                      const key = Object.keys(invoice)[cellIndex] || `field_${cellIndex}`;
                                                      updatedInvoices[index] = {
                                                        ...updatedInvoices[index],
                                                        [key]: e.target.value
                                                      };
                                                      setInvoicesData(updatedInvoices);
                                                    }
                                                  }}
                                                  onBlur={(e) => {
                                                    const rowKey = e.target.closest("tr")?.getAttribute("data-key");
                                                    if (rowKey !== null && rowKey !== undefined) {
                                                      const updateRow = originalRows[rowKey];
                                                      const updateCol = cellIndex;
                                                      const updateVal = e.target.value;
                                                      updateElec(updateRow, updateCol, updateVal);
                                                    }
                                                  }}
                                                  onKeyDown={(e) => {
                                                    if ((e.ctrlKey && e.key === ";") || (e.ctrlKey && e.key === "ك")) {
                                                      e.preventDefault(); // منع السلوك الافتراضي
                                                      const newDate = nowDate.toLocaleDateString("en-US");

                                                      // تحديث القيمة مباشرة
                                                      const updatedInvoices = [...invoicesData];
                                                      if (updatedInvoices[index] && newDate != e.target.value) {
                                                        const key = Object.keys(invoice)[cellIndex] || `field_${cellIndex}`;
                                                        updatedInvoices[index] = {
                                                          ...updatedInvoices[index],
                                                          [key]: newDate
                                                        };
                                                        setInvoicesData(updatedInvoices);
                                                        if(invoiceValues[1].includes("ارضي") && !isNaN(invoiceValues[cellIndex-1])){setPhoneTotal(Number(phoneTotal) + Number(invoiceValues[cellIndex-1]))}
                                                        if(invoiceValues[1].includes("كهربا") && !isNaN(invoiceValues[cellIndex-1])){setElecTotal(Number(elecTotal) + Number(invoiceValues[cellIndex-1]))}
                                                        if(invoiceValues[1].includes("ميا") && !isNaN(invoiceValues[cellIndex-1])){setWaterTotal(Number(waterTotal) + Number(invoiceValues[cellIndex-1]))}
                                                      }
                                                    }
                                                  }}
                                                  className="p-1 w-24 bg-transparent outline-none text-center"
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
