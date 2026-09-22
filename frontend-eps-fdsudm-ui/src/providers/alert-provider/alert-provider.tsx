import { Alert } from "@emorg-prd/standard-react";
import React, { createContext, useContext, useState, useCallback } from "react";


export const AlertTypes = {
  Success: "success",
  Error: "error",
  Info: "info"
} as const;

export type AlertType = (typeof AlertTypes)[keyof typeof AlertTypes];

interface AlertContextType {
  message: string | undefined | null;
  type?: AlertType;
  showAlert: (message: string, type?: AlertType) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<{
    message: string | undefined | null;
    type: AlertType;
  } | null>(null);

  const clearAlert = useCallback(() => {
    console.log("clearAlert - callback")
    setAlert(null)
  }, []);

  const showAlert = useCallback(
    (message: string, type: AlertType = "info") => {
      console.log("showAlert :", message);
      console.log("type :", type);
      setAlert({ message, type });
      console.log(alert);
      // Auto Hide are 3 sec
      //setTimeout(() => setAlert(null), 3000);
    },
    [clearAlert],
  );

  return (
    <AlertContext.Provider
      value={{
        ...alert,
        message: alert?.message || null,
        type: alert?.type || "info",
        showAlert,
        clearAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
