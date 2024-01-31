import PermissionContext from "./PermissionContext";

const PermissionProvider = ({ permissions, children }) => {
  const isAllowedTo = (permission) => {
    if (!permissions) {
      return true;
    }
    if (permissions.admin) {
      return true;
    }
    for (const key of permission) {
      if (permissions.hasOwnProperty(key) && permissions[key]) {
        return true;
      }
    }
    return true;
  };
  return (
    <PermissionContext.Provider value={{ isAllowedTo, permissions }}>
      {children}
    </PermissionContext.Provider>
  );
};

export default PermissionProvider;
