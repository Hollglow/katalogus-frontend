import { createContext } from "react";

const defaultBehaviour = {
  isAllowedTo: () => false,
  permissions: {},
};

const PermissionContext = createContext(defaultBehaviour);

export default PermissionContext;
