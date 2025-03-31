import { useEffect, useState } from "react";
import axios from "axios";

export default function FinancialStatement() {
    const [searchedTable, setSearchedTable] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    const getFinancialStatement = async () => {
        if (!searchValue) return;
        setLoading(true);
        try {
            const response = await axios.post("https://server-xwsx.onrender.com/searchInFinancialStatment", {
                searchValue
            });
            setSearchedTable(response.data);
            console.log(searchedTable)
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    placeholder="أدخل رقم الزبون" 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                    className="border border-primary-500 p-2 rounded w-full outline-none"
                />
                <button 
                    onClick={getFinancialStatement} 
                    disabled={loading} 
                    className="px-4 py-2 bg-primary-500 text-white rounded disabled:opacity-50"
                >
                    {loading ? "جاري البحث..." : "بحث"}
                </button>
            </div>

            <div className={`overflow-y-auto scrollbar-sm h-[70vh] w-full border border-primary-700 rounded-md ${loading ? `animate-pulse` : ``}`}>
                <table className="w-full border-collapse text-center">
                    <thead className="h-12 bg-primary-500 text-white sticky top-0">
                        <tr>
                            {searchedTable.length > 0 && <th className="w-12">#</th>}
                            <th>القيمة</th>
                            <th>التاريخ</th>
                            <th>تفاصيل</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedTable.length > 0 ? (
                            searchedTable.map((inv, index) => (
                                <tr key={index} className="even:bg-primary-100 hover:bg-stone-200 border-b">
                                    <td className="p-2 border border-primary-300">{index + 1}</td>
                                    <td className="p-2 border border-primary-300">{inv.amount}</td>
                                    <td className="p-2 border border-primary-300">{inv.date}</td>
                                    <td className="p-2 border border-primary-300">
                                        {
                                            Object.values(inv.matchingDetail).map( ele =>{
                                                return <>
                                                    <div>{ele}</div>
                                                </>
                                            })
                                        }
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-4 text-gray-500 text-center">لا توجد بيانات</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
