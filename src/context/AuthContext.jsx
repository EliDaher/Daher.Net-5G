import { createContext, useContext, useState, useEffect } from "react";

// إنشاء السياق
const AuthContext = createContext();

// مزود السياق لتغليف التطبيق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // تعيين القيمة الافتراضية بـ null

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // استرجاع بيانات المستخدم
    }

    // تحديث `user` عند تغيير `localStorage` من نافذة أخرى
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // دالة تسجيل الدخول
  const login = async (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData)); // تخزين البيانات
      setUser(userData);
      console.log("User logged in:", userData);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // دالة تسجيل الخروج
  const logout = () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout Error:", error);
    }
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
