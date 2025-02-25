import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";

// إنشاء السياق
const AuthContext = createContext();

// مزود السياق لتغليف التطبيق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  let logoutTimer = null; // متغير لتخزين المؤقت

  // استرجاع بيانات المستخدم من localStorage عند تحميل التطبيق
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // تحديث `user` عند تغيير `localStorage` من نافذة أخرى
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // دالة تسجيل الخروج
  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    Navigate("/Login")
  }, []);

  // دالة إعادة ضبط مؤقت النشاط
  const resetTimer = useCallback(() => {
    if (logoutTimer) clearTimeout(logoutTimer);

    logoutTimer = setTimeout(() => {
      alert("User logged out due to inactivity");
      logout(); // تسجيل الخروج بعد 10 دقائق من عدم النشاط
    }, 10 * 60 * 1000);
  }, [logout]);

  // دالة تسجيل الدخول
  const login = async (userData) => {
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      resetTimer(); // تشغيل المؤقت بعد تسجيل الدخول
      console.log("User logged in:", userData);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    // إضافة مستمعات للأحداث عند تسجيل الدخول
    if (user) {
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      window.addEventListener("click", resetTimer);
      window.addEventListener("scroll", resetTimer);
      resetTimer(); // بدء المؤقت فورًا بعد تسجيل الدخول
    }

    return () => {
      // تنظيف المستمعات عند تسجيل الخروج
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [user, resetTimer]);

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
