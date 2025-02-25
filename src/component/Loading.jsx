import React from "react";


function Loading({type}){
    if(type == "any"){return<>
        <div className="right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
            <div className="p-4 bg-gradient-to-tr animate-spin from-primary-100 to-secondary-900 rounded-full">
                <div className="bg-white rounded-full">
                    <div className="w-24 h-24 rounded-full"></div>
                </div>
            </div>
        </div>
    </>}
    else if(type == "table"){
        return <div className="shadow p-3 m-1 border rounded-lg animate-pulse w-[90%]">
        <h2 className="text-center w-full font-bold text-text-900 my-2">loading....</h2>
        <div className="w-full overflow-scroll h-52">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">رقم الفاتورة</th>
                        <th className="border border-gray-300 px-4 py-2">التاريخ</th>
                        <th className="border border-gray-300 px-4 py-2">المبلغ</th>
                        <th className="border border-gray-300 px-4 py-2">رقم الفاتورة</th>
                        <th className="border border-gray-300 px-4 py-2">التاريخ</th>
                        <th className="border border-gray-300 px-4 py-2">المبلغ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                        <td className="border border-gray-300 px-4 py-2">....</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    } else if(type == "div"){return<>
        <div class="flex justify-center items-center bg-gray-100">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
    </>}
}

export default Loading;