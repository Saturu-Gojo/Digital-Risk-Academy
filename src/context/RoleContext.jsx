import { createContext, useContext, useState } from "react";

const RoleContext = createContext(null);

export const ROLES = {
  ADMIN:  "admin",
  VIEWER: "viewer",
};

export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.ADMIN);
  const isAdmin = role === ROLES.ADMIN;

  return (
    <RoleContext.Provider value={{ role, setRole, isAdmin }}>
      {children}
    </RoleContext.Provider>
  );
}

/** Hook to access the current role and admin flag */
export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}