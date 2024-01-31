import { createContext } from "react";

const defaultBehaviour = {
  isAllowedTo: () => true,
  permissions: {},
};

const PermissionContext = createContext(defaultBehaviour);

export default PermissionContext;
