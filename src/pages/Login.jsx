import { useState } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [state, setState] = useState("login");
    const { setUser, setIsLogin } = useAppContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        
        setUser({ name: formData.name || 'User', email: formData.email });
        setIsLogin(true);
        
        navigate("/");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
            <form 
                onSubmit={handleSubmit} 
                className="sm:w-[400px] w-full text-center border border-gray-200 rounded-3xl px-10 py-12 bg-white shadow-xl shadow-gray-100"
            >
                <div className="mb-8">
                    <h1 className="text-main text-3xl font-bold tracking-tight">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        {state === "login" ? "Please sign in to continue" : "Join us to start building your resume"}
                    </p>
                </div>
                {state !== "login" && (
                    <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        <input 
                            type="text" name="name" placeholder="Full Name" 
                            className="bg-transparent border-none outline-none w-full text-sm text-main" 
                            value={formData.name} onChange={handleChange} required 
                        />
                    </div>
                )}

                <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        className="bg-transparent border-none outline-none w-full text-sm text-main" 
                        value={formData.email} onChange={handleChange} required 
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <input 
                        type="password" name="password" placeholder="Password" 
                        className="bg-transparent border-none outline-none w-full text-sm text-main" 
                        value={formData.password} onChange={handleChange} required 
                    />
                </div>

                {state === "login" && (
                    <div className="mt-3 text-right">
                        <button type="button" className="text-xs font-medium text-secondary hover:underline cursor-pointer">
                            Forgot password?
                        </button>
                    </div>
                )}

                <button 
                    type="submit" 
                    className="mt-8 w-full h-12 rounded-xl text-white bg-primary font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all"
                >
                    {state === "login" ? "Sign In" : "Create Account"}
                </button>

                <p className="text-gray-500 text-sm mt-6">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span 
                        onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                        className="text-secondary font-bold cursor-pointer hover:underline"
                    >
                        {state === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;