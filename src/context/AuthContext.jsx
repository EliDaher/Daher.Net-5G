import { createContext, useContext, useState, useEffect } from "react";


// إنشاء السياق
const AuthContext = createContext();

// مزود السياق لتغليف التطبيق
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // حالة تخزين بيانات المستخدم
    const usernames = [
      {
        name: "elidaher",
        role: "admin"
      },
      {
        name: "nader",
        role: "admin"
      },
      {
        name: "basel",
        role: "employer"
      },
      {
        name: "andreh",
        role: "admin"
      },
      {
        name: "maher",
        role: "admin"
      },
      {
        name: "sara",
        role: "employer"
      },
    ]

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // استرجاع بيانات المستخدم
      }
    }, []);

    // دالة تسجيل الدخول
    const login = async (username) => {        
        try {
        usernames.map(employer => {
          if(employer.name == username){ 
            setUser(usernames[usernames.indexOf(employer)])
            localStorage.setItem("user", JSON.stringify(employer)); // تخزين البيانات
          }
        })
        } catch (error) {
          console.log(error)
        }
    };

  // دالة تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوك مخصص لاستخدام السياق بسهولة
export const useAuth = () => {
  return useContext(AuthContext);
};
