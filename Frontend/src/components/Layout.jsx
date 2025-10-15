import { Outlet, useNavigation } from "react-router";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import Footer from "./Footer.jsx";

const isDarkModeStored = window.localStorage.getItem('isDarkMode');
const isDarkMode =
    isDarkModeStored === 'true' || isDarkModeStored === 'false'
        ? isDarkModeStored === 'true'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function Layout() {
    const [darkMode, setDarkMode] = useState(Boolean(isDarkMode));
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    const toggleDarkMode = () => {
        window.localStorage.setItem("isDarkMode", String(!darkMode));
        setDarkMode(p => !p);

    }

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [darkMode]);
    return (
        <div className="inter">
            <Toaster />
            <Header />

            {isNavigating && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
                    <CircularProgress />
                </div>
            )}
            <div className="mt-[60px] min-h-[100vh]">
                <Outlet />
            </div>

            <footer>
                <Footer/>
            </footer>
        </div>
    )
}