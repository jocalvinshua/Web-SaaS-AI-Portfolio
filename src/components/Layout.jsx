import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppContext } from "../AppContext/AppContext";

export default function Layout() {
    const { logout } = useAppContext(); // Gunakan fungsi logout dari context

    return (
        <div className="min-h-screen flex flex-col">
            <header className="flex items-center justify-between px-8 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">AI</div>
                    <span className="text-xl font-bold text-primary">PortfoliUI</span>
                </Link>
                <div className="flex items-center gap-5">
                    <p className="text-gray-600 text-sm hidden sm:block">Hi, Admin!</p>
                    <button 
                        onClick={() => alert("Logout Successfully")} 
                        className='border border-gray-300 rounded-full text-sm px-5 py-1.5 hover:bg-gray-50 transition-all'
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex flex-1 h-[calc(100vh-60px)]"> 
                <Sidebar />
                <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}