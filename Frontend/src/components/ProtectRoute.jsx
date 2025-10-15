import { useNavigate, Outlet, useLocation } from "react-router";
import { useEffect,useState } from "react";
import useAuthStore from "../stores/AuthStore.js";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from 'react-hot-toast';

export default function ProtectRoute() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const location = useLocation();
  const [authChecked, setAuthChecked ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading && !authChecked) {
      checkAuth().catch(e=>{}).finally(()=>setAuthChecked(true));
    }
  }, [isAuthenticated, isLoading, checkAuth]);

  if (isLoading || (!isAuthenticated && !authChecked)) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <CircularProgress/>
      </div>
    );
  }

  if(isAuthenticated)return <Outlet/>
  else {
    toast.error('Login to access this page.');
    navigate(`/login?redirectTo=${encodeURIComponent(location.pathname + location.search)}`)
  }
}