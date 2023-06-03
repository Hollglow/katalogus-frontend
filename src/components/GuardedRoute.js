import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import PermissionContext from "./PermissionContext"

export const GuardedRoute = ({AccessibleTo, redirectRoute = '/'}) => {
  const {permissions} = useContext(PermissionContext);
  for (const key of AccessibleTo){
    if (permissions.hasOwnProperty(key) && permissions[key]) {
      return <Outlet/>;
    }
  }
  return <Navigate to={redirectRoute} replace/>;
}