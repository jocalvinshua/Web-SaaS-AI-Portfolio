import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext/AppContext';

const HeroSection = () => {
    const navigate = useNavigate()
    const {isLogin} = useAppContext()

    const handleLogin = ()=>{
        if(isLogin){
            navigate('/dashboard')
        }else{
            navigate('/login')
        }
    }
    return (
        <main className="flex flex-col items-center max-md:px-2">
            <a href="https://prebuiltui.com" className="mt-32 flex items-center gap-2 border border-indigo-200 rounded-full p-1 pr-3 text-sm font-medium text-primary-light bg-indigo-200/20">
                <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    NEW
                </span>
                <p className="flex items-center gap-1">
                    <span>Try 7 days free trial option </span>
                    <svg className="mt-1" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </p>
            </a>

            <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[80px] font-semibold max-w-4xl text-slate-900">
                The fastest way to go from idea to impact.
            </h1>
            <p className="text-center text-base text-slate-700 max-w-lg mt-2">
                Our platform helps you build, test, and deliver faster — so you can focus on what matters.
            </p>
            <div className="flex items-center gap-4 mt-8">
                <button 
                onClick={handleLogin}
                className="flex items-center gap-2 btn-primary active:scale-95 rounded-lg px-7 h-11">
                    Get started
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
            {/* Trusted brand */}
        </main>
    );
};

export default HeroSection;