import PermissionContext from "./PermissionContext";

const PermissionProvider = ({ permissions, children }) => {
  const isAllowedTo = (permission) => {
    if (!permissions) {
      return false;
    }
    if (permissions.admin) {
      return true;
    }
    for (const key of permission) {
      if (permissions.hasOwnProperty(key) && permissions[key]) {
        return true;
      }
    }
    return false;
  };
  return (
    <PermissionContext.Provider value={{ isAllowedTo, permissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
