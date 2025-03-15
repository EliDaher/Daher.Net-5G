import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function InternetInvoiceTable({ loading, internetMatchingRows, internetOriginalRows, finalTable, setFinalTable, searchText, work, setWork, internetTotal, setInternetTotal }) {
    const [invoicesData, setInvoicesData] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
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
        "9/25",
        "10/25",
        "11/25",
        "12/25",
    ]);


    useEffect(() => {
        if (internetMatchingRows.length > 0) {
            setInvoicesData(internetMatchingRows)
            setOriginalRows(internetOriginalRows)
            setWork(false);
        }else {
            setInvoicesData([])
            setOriginalRows([])
            setWork(false);
        }
    }, [internetMatchingRows]);
    
    const updateInternet = (originalRow, colIndex, newValue) => {
        axios.post('https://server-xwsx.onrender.com/update', {
            row: originalRow, // رقم الصف الأصلي
            col: colIndex, // رقم العمود
            value: newValue // القيمة الجديدة
        })
        .then(response => {
            //console.log("Data updated successfully:", response.data);
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
                <h2 className="text-center font-bold text-gray-900 text-xl my-4">
                    فواتير الإنترنت
                </h2>
                <div>
                    <p className="font-bold text-text-950 p-2 rounded-lg shadow shadow-primary-400">انترنت {internetTotal}</p>
                </div>
            </div>

            <div className="w-full overflow-auto max-h-96 rounded-lg border border-gray-300">
                {invoicesData.length > 0 ? (
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-800 text-white text-center">
                        <tr className="max-h-2 leading-none border-xl border-primary-800">
                                <th className="border border-gray-600 px-1 py-2">#</th>
                                <th className="border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[0px]">رقم الهاتف</th>
                                <th className="border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[120px]">اسم المشترك</th>
                                <th className="border border-gray-600 px-1 py-2 bg-gray-800 sticky right-[240px]">الشركة</th>
                                <th className="border border-gray-600 px-1 py-2">السرعة</th>
                                <th className="border border-gray-600 px-1 py-2">تاريخ التسديد</th>
                                <th className="border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[288px]">الفاتورة الشهرية</th>
                                <th className="border border-gray-600 px-4 py-2 bg-gray-800 sticky right-[400px]">ملاحظات</th>

                                {thArr.map((thText, index) =>{
                                        return(<>
                                        <th className="border border-gray-600 px-4 py-2">{thText}</th>
                                        <th className="border border-gray-600 px-4 py-2">{thText}</th>
                                        <th className="border border-gray-600 px-4 py-2"></th>
                                    </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {invoicesData.map((invoice, index) => {
                                const invoiceValues = Object.values(invoice);
                                const totalCells = 50;

                                return (
                                    <tr
                                        key={index}
                                        className="even:bg-gray-100 transition-all
                                        duration-200 [&>*:nth-child(3n+11)>*>*]:w-7 
                                        [&>*:nth-child(8)]:bg-yellow-300 
                                        [&>*:nth-child(7)]:bg-green-400 
                                        hover:bg-primary-100 [&>*:nth-child(8)>*>*]:w-52 
                                        [&>*:nth-child(6)>*>*]:w-12 [&>*:nth-child(5)>*>*]:w-12 
                                        [&>*:nth-child(4)>*>*]:w-12 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(-n+4)]:sticky
                                        [&>*:nth-child(7)]:sticky
                                        [&>*:nth-child(8)]:sticky
                                        [&>*:nth-child(2)]:right-[0px]
                                        [&>*:nth-child(3)]:right-[120px]
                                        [&>*:nth-child(4)]:right-[248px]
                                        [&>*:nth-child(7)]:right-[297px]
                                        [&>*:nth-child(8)]:right-[410px]
                                        [&>*:nth-child(-n+4)]:bg-white
                                        "
                                        data-key={index}
                                    >
                                        {Array.from({ length: totalCells }, (_, cellIndex) => (
                                            <td key={cellIndex} className="border border-gray-300">
                                                <div className="flex">
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
                                                        className="p-1 w-32 bg-transparent outline-none text-center"
                                                    />
                                                    <button 
                                                        onClick={(e)=>{
                                                            const newDate = nowDate.toLocaleDateString("en-US");
                                                             
                                                            // تحديث القيمة مباشرة
                                                            const updatedInvoices = [...invoicesData];
                                                            if(updatedInvoices[index][cellIndex] == newDate ){
                                                                const key = Object.keys(invoice)[cellIndex] || `field_${cellIndex}`;
                                                                const key_1 = Object.keys(invoice)[cellIndex-1] || `field_${cellIndex-1}`;
                                                                updatedInvoices[index] = {
                                                                  ...updatedInvoices[index],
                                                                  [key_1]: "",
                                                                  [key]: ""
                                                                };
                                                                setInvoicesData(updatedInvoices);
                                                                if(!isNaN(invoiceValues[cellIndex-1])){setInternetTotal(Number(internetTotal) -  Number(invoiceValues[cellIndex-1]))}
                                                                const rowKey = e.target.closest("tr")?.getAttribute("data-key");
                                                                if (rowKey !== null && rowKey !== undefined) {
                                                                  const updateRow = originalRows[rowKey];
                                                                  var updateCol = cellIndex;
                                                                  var updateVal = "";
                                                                  updateInternet(updateRow, updateCol, updateVal);
                                                                  updateCol = cellIndex-1;
                                                                  updateVal = "";
                                                                  updateInternet(updateRow, updateCol, updateVal);
                                                                }
                                                                const deletedInvoice = {
                                                                    customerName:(invoice)[2],
                                                                    customerNumber:(invoice)[1],
                                                                    customerDetails:(invoice)[3],
                                                                    invoiceNumber:thArr[cellIndex/3-3],
                                                                    invoiceValue:(invoice)[6],
                                                                }
                                                                setFinalTable(finalTable.filter(inv => 
                                                                    !(
                                                                        inv.customerName === deletedInvoice.customerName &&
                                                                        inv.customerNumber === deletedInvoice.customerNumber &&
                                                                        inv.customerDetails === deletedInvoice.customerDetails &&
                                                                        inv.invoiceNumber === deletedInvoice.invoiceNumber &&
                                                                        inv.invoiceValue === deletedInvoice.invoiceValue
                                                                    )
                                                                ));
                                                            }
                                                            else {
                                                              const key = Object.keys(invoice)[cellIndex] || `field_${cellIndex}`;
                                                              const key_1 = Object.keys(invoice)[cellIndex-1] || `field_${cellIndex-1}`;
                                                              const invValue = (invoice)[6];
                                                              updatedInvoices[index] = {
                                                                ...updatedInvoices[index],
                                                                [key_1]: invValue,
                                                                [key]: newDate
                                                              };
                                                              setInvoicesData(updatedInvoices);
                                                              if(!isNaN(invoiceValues[cellIndex-1])){setInternetTotal(Number(internetTotal) + Number(invValue))}
                                                                const rowKey = e.target.closest("tr")?.getAttribute("data-key");
                                                                if (rowKey !== null && rowKey !== undefined) {
                                                                  const updateRow = originalRows[rowKey];
                                                                  var updateCol = cellIndex;
                                                                  var updateVal = newDate;
                                                                  updateInternet(updateRow, updateCol, updateVal);
                                                                  updateCol = cellIndex-1;
                                                                  updateVal = invValue;
                                                                  updateInternet(updateRow, updateCol, updateVal);
                                                                }
                                                                const newInvoice = {
                                                                    customerName:(invoice)[2],
                                                                    customerNumber:(invoice)[1],
                                                                    customerDetails:(invoice)[3],
                                                                    invoiceNumber:thArr[cellIndex/3-3],
                                                                    invoiceValue:(invoice)[6],
                                                                }
                                                                setFinalTable([...finalTable, newInvoice ])
                                                            }

                                                        }}
                                                        className={`hover:bg-accent-600 w-4 ${Number(cellIndex + 1) % 3 === 1 && cellIndex > 7 ? 'bg-accent-400' : 'hidden'} ${(invoice)[cellIndex-1] ? 'bg-red-400 hover:bg-red-600' : ''}`}>
                                                        +
                                                    </button>
                                                </div>
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
