import { useContext } from "react"
import PermissionContext from "./PermissionContext"

const Restricted = ({to, children}) => {
  const {isAllowedTo} = useContext(PermissionContext);

  if(isAllowedTo(to)){
    return <>{children}</>
  }

  return null;
}

export default Restricted;