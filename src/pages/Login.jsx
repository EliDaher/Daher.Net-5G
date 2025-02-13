import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email);
    if (user.role == "admin"){
      navigate("dashboard")
    }else{
      navigate("invoice")
    }
  };

  return (
    <div className="flex max-h-full items-center justify-center w-screen h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-background-800 shadow-[0px_0px_20px] shadow-primary-200 border border-primary-300 rounded-xl">
        <h2 className="text-3xl font-bold text-text-100 text-center">Daher.Net</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-200 mb-1">Email</label>
            <input
              type="text"
              className="w-full p-3 bg-background-700 text-text-100 border border-background-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/*<div className="hidden">
            <label className="block text-text-200 mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-background-700 text-text-100 border border-background-600 rounded-lg focus:ring-2 focus:ring-primary-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>*/}
          <button
            type="submit"
            className="w-full p-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
