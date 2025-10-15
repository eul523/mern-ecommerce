import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import HeaderNav from "./HeaderNav.jsx";
import useAuthStore from "../stores/AuthStore.js";
import CircularProgress from "@mui/material/CircularProgress";
import useCartStore from "../stores/CartStore.js";

export default function Header() {
    const { isAuthenticated, user, logout, isLoading} = useAuthStore();
    const { items } = useCartStore();
    return (
        <header className=" z-999 h-[50px] w-full m-0 mb-[50px] flex justify-between items-center fixed top-0 left-0 right-0 backdrop-blur-sm">
            <Link 
               to='/' 
               className="text-2xl font-bold text-gray-800 flex items-center h-full px-4 gap-2"
            >Cartify</Link>

            <HeaderNav/>

            <div className="flex items-center gap-4 h-full px-4">
                <Link 
                    to='/cart'
                    className="relative"
                >
                    <ShoppingCart size={20}/>
                    <p className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{items.length}</p>
                </Link>
                {isAuthenticated ? (
                    <>
                    <p>{user.name}</p>
                    <button onClick={logout}>{isLoading ? <CircularProgress size={15}/> : 'Logout'}</button>
                    </>
                    
                ) : (
                    <Link to='/login'>Login</Link>
                )}
            </div>
        </header>
    )
}