import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";

export default function ElecTable({ loading, elecMatchingRows, elecOriginalRows, finalTable, setFinalTable, searchText, work, setWork, elecTotal, phoneTotal, waterTotal, setElecTotal, setPhoneTotal, setWaterTotal }) {
    const [invoicesData, setInvoicesData] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
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

    
    const updateElec = (originalRow, colIndex, newValue) => {
        axios.post('https://server-uvnz.onrender.com/updateElec', {
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

    useEffect(() => {
        if (elecMatchingRows.length > 0) {
            setInvoicesData(elecMatchingRows)
            setOriginalRows(elecOriginalRows)
            setWork(false);
        } else {
            setInvoicesData([])
            setOriginalRows([])
            setWork(false);
        }
    }, [elecMatchingRows]);
    

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
                            <tr className="max-h-4 leading-none border-xl border-primary-800">
                                <th className="border border-gray-600 px-1 sticky right-[0px] z-20 top-0 bg-gray-800">#</th>
                                <th className="border border-gray-600 px-2 sticky right-[47px] z-20 top-0 bg-gray-800">نوع الفاتورة</th>
                                <th className="border border-gray-600 px-2 sticky right-[165px] z-20 top-0 bg-gray-800"></th>
                                <th className="border border-gray-600 px-2 sticky right-[292px] z-20 top-0 bg-gray-800">الرقم</th>

                                {thArr.map(thText =>{
                                    return(<>
                                        <th className="border border-gray-600 bg-primary-800"></th>
                                        <th className="border border-gray-600 px-2 py-2 ">الدورة</th>
                                        <th className="border border-gray-600 px-2 py-2 ">قيمة الفاتورة</th>
                                        <th className="border border-gray-600 px-2 py-2 ">المبلغ المقبوض</th>
                                        <th className="border border-gray-600 px-2 py-2 ">تاريخ الدفع</th>
                                        <th className="border border-gray-600 px-2 py-2 ">ملاحظات</th>
                                    </>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {invoicesData.map((invoice, index) => {
                                const invoiceValues = Object.values(invoice);
                                const totalCells = 70;

                                return (
                                    <tr
                                        key={index}
                                        className={`transition-all duration-200 
                                        ${invoiceValues[1].includes("ارضي") ? `bg-orange-200` : ``}
                                        ${invoiceValues[1].includes("كهربا") ? `bg-yellow-200` : ``}
                                        ${invoiceValues[1].includes("ميا") ? `bg-blue-200` : ``}
                                        [&>*:nth-child(6n-1)>*:nth-child(1)>*]:w-1 [&>*:nth-child(1)>*>*]:w-12
                                        [&>*:nth-child(6n-1)>*>*]:w-20 [&>*:nth-child(6n-1)]:bg-primary-700 
                                        hover:bg-primary-100 [&>*:nth-child(6n)>*:nth-child(1)>*]:w-14
                                        [&>*:nth-child(-n+4)]:sticky [&>*:nth-child(-n+4)]:z-10
                                        [&>*:nth-child(-n+4)]:bg-white
                                        [&>*:nth-child(-n+4)]:font-bold

                                        [&>*:nth-child(1)]:right-0
                                        [&>*:nth-child(2)]:right-[47px]
                                        [&>*:nth-child(3)]:right-[165px]
                                        [&>*:nth-child(4)]:right-[292px]`}
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

                                                        if (updatedInvoices[index]) {
                                                          const key = Object.keys(invoice)[cellIndex] || `field_${cellIndex}`;
                                                          updatedInvoices[index] = {
                                                            ...updatedInvoices[index],
                                                            [key]: e.target.value
                                                          };
                                                          setInvoicesData(updatedInvoices);
                                                        }
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
                                                                if(invoiceValues[1].includes("ارضي") && !isNaN(invoiceValues[cellIndex-1])){setPhoneTotal(Number(phoneTotal) - Number(invoiceValues[cellIndex-1]))}
                                                                if(invoiceValues[1].includes("كهربا") && !isNaN(invoiceValues[cellIndex-1])){setElecTotal(Number(elecTotal) - Number(invoiceValues[cellIndex-1]))}
                                                                if(invoiceValues[1].includes("ميا") && !isNaN(invoiceValues[cellIndex-1])){setWaterTotal(Number(waterTotal) - Number(invoiceValues[cellIndex-1]))}
                                                                const rowKey = e.target.closest("tr")?.getAttribute("data-key");
                                                                if (rowKey !== null && rowKey !== undefined) {
                                                                  const updateRow = originalRows[rowKey];
                                                                  var updateCol = cellIndex;
                                                                  var updateVal = "";
                                                                  updateElec(updateRow, updateCol, updateVal);
                                                                  updateCol = cellIndex-1;
                                                                  updateVal = "";
                                                                  updateElec(updateRow, updateCol, updateVal);
                                                                }
                                                                const deletedInvoice = {
                                                                    customerName:(invoice)[1],
                                                                    customerNumber:(invoice)[3],
                                                                    customerDetails:(invoice)[2],
                                                                    invoiceNumber:(invoice)[cellIndex-3],
                                                                    invoiceValue:(invoice)[cellIndex-2],
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
                                                              const invValue = (invoice)[cellIndex-2];
                                                              updatedInvoices[index] = {
                                                                ...updatedInvoices[index],
                                                                [key_1]: invValue,
                                                                [key]: newDate
                                                              };
                                                              setInvoicesData(updatedInvoices);
                                                              if(invoiceValues[1].includes("ارضي") && !isNaN(invoiceValues[cellIndex-1])){setPhoneTotal(Number(phoneTotal) + Number(invValue))}
                                                              if(invoiceValues[1].includes("كهربا") && !isNaN(invoiceValues[cellIndex-1])){setElecTotal(Number(elecTotal) + Number(invValue))}
                                                              if(invoiceValues[1].includes("ميا") && !isNaN(invoiceValues[cellIndex-1])){setWaterTotal(Number(waterTotal) + Number(invValue))}
                                                                const rowKey = e.target.closest("tr")?.getAttribute("data-key");
                                                                if (rowKey !== null && rowKey !== undefined) {
                                                                  const updateRow = originalRows[rowKey];
                                                                  var updateCol = cellIndex;
                                                                  var updateVal = newDate;
                                                                  updateElec(updateRow, updateCol, updateVal);
                                                                  updateCol = cellIndex-1;
                                                                  updateVal = invValue;
                                                                  updateElec(updateRow, updateCol, updateVal);
                                                                }
                                                                const newInvoice = {
                                                                    customerName:(invoice)[2],
                                                                    customerNumber:(invoice)[3],
                                                                    customerDetails:(invoice)[1],
                                                                    invoiceNumber:(invoice)[cellIndex-3],
                                                                    invoiceValue:(invoice)[cellIndex-2],
                                                                }
                                                                setFinalTable([...finalTable, newInvoice ])
                                                            }

                                                        }}
                                                        className={`hover:bg-accent-600 w-4 ${cellIndex % 6 === 2 && cellIndex > 4 ? 'bg-accent-400' : 'hidden'} ${(invoice)[cellIndex-1] ? 'bg-red-400 hover:bg-red-600' : ''}`}>
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
