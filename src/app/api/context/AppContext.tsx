"use client"
import { createContext, useContext, useState } from "react"

type AppContextType = {
    searchTerm : string;
    setSearchTerm : (val : string) => void;
    user : any;
    setUser : (val : string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider ({ children } : { children : React.ReactNode }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{searchTerm, setSearchTerm, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext () {
    const context = useContext(AppContext);
    if (!context)
      throw new Error("useAppContext must be used inside AppProvider");
    return context;
}

