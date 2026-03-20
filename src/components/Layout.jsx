import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext/AppContext";
import { useEffect } from "react";

export default function Layout() {
    const { user, dispatch, isLogin } = useAppContext();
    const navigate = useNavigate();

    const logout = () => {
        navigate("/", { replace: true });
        dispatch({ type: "LOGOUT" });
    }

    // render only user already login
    useEffect(()=>{
        if(!isLogin){
            navigate("/")
        }
    }, [isLogin])

    return (
        <div className="min-h-screen flex flex-col font-['Outfit']">
            <header className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">AI</div>
                    <span className="text-xl font-bold text-primary">PortfoliUI</span>
                </Link>
                <div className="flex items-center gap-5">
                    {/* PERBAIKAN: Gunakan user?.name, bukan {user} */}
                    <p className="text-gray-600 text-sm hidden sm:block">
                        Hi, <span className="font-semibold text-main">{user?.name || 'User'}</span>!
                    </p>
                    
                    <button 
                        onClick={logout} 
                        className='border border-gray-300 rounded-full text-sm px-5 py-1.5 hover:bg-gray-50 active:scale-95 transition-all text-main font-medium'
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex flex-1 h-[calc(100vh-60px)]"> 
                <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}