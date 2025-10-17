import { useNavigate } from "react-router";
import { LogOut, LogIn } from "lucide-react";
import { useRef, useEffect } from "react";
import useAuthStore from '../stores/AuthStore.js';

export default function ProfilePopup({name, setShowPopup, profileRef}){

    const popupRef = useRef(null);
    const { logout, isAuthenticated } = useAuthStore();

    const handleClick = async () => {
        try{
            if(isAuthenticated)await logout();
            else window.location.href = '/login';
        }catch(err){
        }
    }
    
        useEffect(() => {
            const handleOutsideClick = (e) => {
                if (popupRef.current && !popupRef.current.contains(e.target) && profileRef.current && !profileRef.current.contains(e.target)) {
                    setShowPopup(false);
                }
            }
            document.addEventListener("mousedown", handleOutsideClick);
            document.addEventListener("touchstart", handleOutsideClick);
    
            return () => {
                document.removeEventListener("mousedown", handleOutsideClick);
                document.removeEventListener("touchstart", handleOutsideClick);
            };
    
        }, [])

    return(
        <div ref={popupRef} className="absolute right-0 top-[50px] mt-2 w-56 rounded-2xl bg-white shadow-lg ring-1 ring-black/10 z-50 flex flex-col p-4 space-y-4">

            <p>Hey {name}👋</p>
            <button className="hover:text-black text-gray-500 w-full font-medium flex justify-start items-center gap-2" onClick={()=>{setShowPopup(false);handleClick();}}>{isAuthenticated ? <LogOut size={20}/> : <LogIn size={20}/>}{isAuthenticated ? 'Sign out' : 'Login'}</button>
        </div>
    )
}