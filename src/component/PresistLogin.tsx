import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { Navigate, Outlet, useLocation } from "react-router-dom"

import React from "react";




const PresistLogin = () => {
  const { auth, setAuth }: any = useAuth();
  const [isLoading, setLoading] = useState(true);

  const path = useLocation();

  useEffect(() => {
    const persist = () => {
      setAuth({
        access_token: localStorage.getItem('access'),
      });
      setLoading(false); // Set loading to false after setting auth
    };

    if (!auth?.access_token) {
      persist();
    } else {
      setLoading(false);
    }
  }, [isLoading, setAuth]);

  useEffect(() => {
    console.log(auth);
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : auth?.access_token ? (
        <Outlet/>
      ) : (
        <Navigate to="/login" state={{ from: path }} replace />
      )}
    </>
  );
};

export default PresistLogin;