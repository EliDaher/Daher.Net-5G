import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";
import DaherLogo from "../images/DaherLogo";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // مسح أي خطأ سابق

    try {
      const response = await axios.post("https://server-xwsx.onrender.com/UserLogin", {
        username: email,
        password: password
      });

      if (response.data.user) {
        login(response.data.user);
        navigate(response.data.user.role === "admin" ? "/dashboard" : response.data.user.role === "dealer" ? "/customers" : "/invoice");
      } else {
        throw new Error("بيانات تسجيل الدخول غير صحيحة");
      }
    } catch (err) {
      console.error("خطأ في تسجيل الدخول:", err);
      setError("خطأ في تسجيل الدخول، تحقق من البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-full items-center justify-center w-screen h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-background-800 shadow-lg border border-primary-300 rounded-xl">
        <DaherLogo/>
        <h2 className="text-4xl font-bold text-white text-center select-none font-Pacifico">Daher.Net</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-text-200 mb-1">Email</label>
            <input
              type="text"
              className="w-full p-3 bg-background-700
              text-text-100 border border-background-600 
              rounded-lg focus:ring-2 focus:ring-primary-400 
              focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-text-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-background-700 text-text-100 border border-background-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition duration-300 ${loading ? "animate-pulse" : ""}`}
            disabled={loading}
          >
            {loading ? "جاري تسجيل الدخول..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
