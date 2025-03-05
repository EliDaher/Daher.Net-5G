
export default function EmployeeBalanceTotal({setPayOrInv, openAddBalanceForm, Total}){

    return <>
         <div className="flex h-10 items-center justify-around mt-8">
            <span className="text-center text-xl font-bold">الرصيد الحالي : <strong>{Number(Total)}</strong></span>
            <div className="flex gap-3 px-2">
                <button onClick={()=>{
                    setPayOrInv("pay")
                    openAddBalanceForm()
                }} 
                className="p-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >اضافة الى رصيد</button>
                <button 
                onClick={()=>{
                    setPayOrInv("inv")
                    openAddBalanceForm()
                }}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                >دفع من رصيد</button>
            </div>
        </div>
    </>

}