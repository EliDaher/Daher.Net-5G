import React, { useRef } from "react";
import FinalTableCom from "../component/FinalTableCom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useReactToPrint } from "react-to-print";

function ConfirmInvForm({ clearAllTables, TotalInvoices, finalTable, isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;
  const { user } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

  /*  try {
      const invoiceData = {
        amount: TotalInvoices, // قيمة الفاتورة
        employee: user.username, // اسم الموظف
        details: { ...finalTable },
      };

      const response = await axios.post("https://server-xwsx.onrender.com/addInvoice", invoiceData);

      if (response.data.success) {
        console.log("تمت إضافة الفاتورة بنجاح!");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الفاتورة:", error.response?.data || error.message);
    }
*/
    copyToClipboard(finalTable)

    clearAllTables();
    onSubmit();
    onClose();
  };

  const tableRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: tableRef, // استخدام contentRef بشكل صحيح
    pageStyle: `
      @page {
        size: 80mm auto; /* ضبط عرض الورقة والطول تلقائي */
        margin: 0; /* إزالة الهوامش */
      }

      body {
        font-family: Arial, sans-serif;
      }

      .no-print {
        display: none; /* إخفاء العناصر غير المرغوبة أثناء الطباعة */
      }

      @media print {
        body, table, th, td {
          color: black !important;
        }

        body {
          width: 80mm;
          height: auto; /* السماح للطباعة بتحديد الطول حسب المحتوى */
          margin: 0;
          padding-bottom: 20px; /* إضافة 20px هامش سفلي */
          display: flex;
          flex-direction: column;
          align-items: center; /* توسيط المحتوى */
          justify-content: flex-start;
          font-family: Arial, sans-serif; /* استخدام خط واضح */
          font-size: 14px; /* زيادة حجم الخط */
        }

        .header {
          text-align: center;
          font-size: 16px;
          margin-bottom: 10px;
          margin-top: 10px;
          font-weight: 900;
        }

        .header span {
          display: block;
          margin-bottom: 2px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        td, th {
          border: 1px solid black;
          padding: 5px;
          font-weight: bold;
          word-wrap: break-word;
          text-align: center;

        }

        .total {
          font-weight: bold;
        }

        /* إضافة قطع الورقة بناءً على المحتوى */
        .cut {
          page-break-before: always; /* قطع الصفحة عند هذه النقطة */
        }
      }
    `,
    onBeforeGetContent: () => {
      if (!tableRef.current) {
        console.error("لا يوجد محتوى للطباعة!");
        return false;
      }
      return true;
    },
    onAfterPrint: () => {
      console.log("تمت الطباعة بنجاح!");
      onClose(); // إغلاق النافذة بعد الطباعة
    },
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return now.toLocaleDateString('en-GB', options);
  };

  const copyToClipboard = (copyText) => {
    const formattedText = copyText.map((item, index) => 
      `Customer ${index + 1}:
      - Details: ${item.customerDetails}
      - Name: ${item.customerName}
      - Number: ${item.customerNumber}
      - Invoice #: ${item.invoiceNumber}
      - Invoice Value: ${item.invoiceValue}
      `
    ).join("\n\n"); // Separate each object with a newline

    navigator.clipboard.writeText(formattedText)

  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <button
            className="absolute top-6 left-6 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-right">
            تأكيد الفواتير
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="h-96 overflow-y-scroll mb-3 shadow scrollbar-sm">
              <div ref={tableRef}>
                {/* رأس الفاتورة */}
                <div className="header">
                  <span>Daher.Net</span>
                  <span>{getCurrentDateTime()}</span>
                </div>

                <div className="text-right">
                  <FinalTableCom finalTable={finalTable}></FinalTableCom>
                </div>
                <h3 className="my-3">المجموع : <strong>{TotalInvoices}</strong></h3>
              </div>
            </div>
            <div className="flex justify-start gap-3">
              <button
                type="submit"
                className="bg-primary-500 text-white font-bold px-3 py-1 rounded hover:bg-primary-600"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePrint(); // فتح نافذة الطباعة
                }}
                className="bg-accent-500 text-white font-bold px-3 py-1 rounded hover:bg-accent-600"
              >
                Print
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white font-bold px-3 py-1 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConfirmInvForm;
