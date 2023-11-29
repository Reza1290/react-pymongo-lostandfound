import { Navigate, useLocation, Outlet} from "react-router-dom";


import useAuth from "../hooks/useAuth";


const RequireAuth = () => {
  const { auth }: any = useAuth()
  const path = useLocation()
  console.log(auth)

  return auth?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  )
}


export default RequireAuth