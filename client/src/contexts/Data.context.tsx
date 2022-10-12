import { createContext, PropsWithChildren } from "react";
import { useLocalStorage } from "usehooks-ts";

export const DataContext = createContext({});

export default function DataProvider({ children }: PropsWithChildren) {
  const [company, setCompany] = useLocalStorage("company", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <DataContext.Provider value={{ user, setUser, token, setToken, company, setCompany }}>
      {children}
    </DataContext.Provider>
  );
}
