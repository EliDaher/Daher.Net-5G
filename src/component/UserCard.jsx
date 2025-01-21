import React from "react";

function UserCard({userName, userIndex, userSpeed, userSender, userLocation, userAccount, userPassword, userContact, userIp, userFee}){
    return <>
        <strong className="text-primary900 underline underline-offset-2 text-2xl">{userIndex}.{userName}</strong>
        <div className="font-bold text-gray-500 flex mt-2">
            <p>سرعة الاشتراك : &nbsp;
            </p>  
            <div>{userSpeed}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p> الفاتورة الشهرية : &nbsp;
            </p>  
            <div>{userFee}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p>المرسل : &nbsp;
            </p>  
            <div>{userSender}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p>الموقع : &nbsp;
            </p>  
            <div>{userLocation}</div>
        </div>
        <div className="font-bold text-gray-500 flex flex-col">
            <p>اسم المستخدم : &nbsp;
            </p>  
            <div>{userAccount}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p>كلمة المرور : &nbsp;
            </p>  
            <div>{userPassword}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p>للتواصل : &nbsp;
            </p>  
            <div>{userContact}</div>
        </div>
        <div className="font-bold text-gray-500 flex">
            <p>عنوان ip : &nbsp;
            </p>  
            <div>{userIp}</div>
        </div>
    </>
}

export default UserCard;

