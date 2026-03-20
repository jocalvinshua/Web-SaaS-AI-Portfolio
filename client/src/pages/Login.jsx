import { useState } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Loader2 } from "lucide-react";

const Login = () => {
    const [state, setState] = useState("login");
    const { isLoading, error, dispatch } = useAppContext();
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

        dispatch({ type: "LOGIN_START" });
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const userData = {
                name: formData.name || "User",
                email: formData.email,
            };
            console.log(userData)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: userData
            });

            navigate("/dashboard");

        } catch (err) {
            dispatch({
                type: "LOGIN_FAILURE",
                payload: "Login failed. Please try again."
            });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 font-['Outfit']">
            <form 
                onSubmit={handleSubmit} 
                className="sm:w-[400px] w-full text-center border border-gray-200 rounded-3xl px-10 py-12 bg-white shadow-xl shadow-gray-100"
            >
                <div className="mb-8">
                    <h1 className="text-gray-900 text-3xl font-bold tracking-tight">
                        {state === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">
                        {state === "login" ? "Please sign in to continue" : "Join us to start building your resume"}
                    </p>
                </div>

                {state !== "login" && (
                    <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3 text-gray-400 focus-within:text-primary">
                        <User size={18} />
                        <input 
                            type="text" name="name" placeholder="Full Name" 
                            className="bg-transparent border-none outline-none w-full text-sm text-gray-900" 
                            value={formData.name} onChange={handleChange} required 
                        />
                    </div>
                )}

                {/* Email Input */}
                <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3 text-gray-400 focus-within:text-primary">
                    <Mail size={18} />
                    <input 
                        type="email" name="email" placeholder="Email Address" 
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-900" 
                        value={formData.email} onChange={handleChange} required 
                    />
                </div>

                {/* Password Input */}
                <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-200 h-12 rounded-xl focus-within:border-primary focus-within:bg-white transition-all px-4 gap-3 text-gray-400 focus-within:text-primary">
                    <Lock size={18} />
                    <input 
                        type="password" name="password" placeholder="Password" 
                        className="bg-transparent border-none outline-none w-full text-sm text-gray-900" 
                        value={formData.password} onChange={handleChange} required 
                    />
                </div>

                {/* Error Display */}
                {error && (
                    <p className="text-red-500 text-xs mt-3 text-left ml-1 font-medium italic">
                        * {error}
                    </p>
                )}

                {state === "login" && (
                    <div className="mt-3 text-right">
                        <button type="button" className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">
                            Forgot password?
                        </button>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-8 w-full h-12 rounded-xl text-white bg-primary font-bold shadow-lg shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:bg-blue-300 disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                        </>
                    ) : (
                        state === "login" ? "Sign In" : "Create Account"
                    )}
                </button>

                <p className="text-gray-500 text-sm mt-6">
                    {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span 
                        onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                        className="text-blue-600 font-bold cursor-pointer hover:underline"
                    >
                        {state === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;