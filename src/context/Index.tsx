"use client";

import { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children } : {
children: React.ReactNode;
}) {
const [loggedIn, setLoggedIn] = useState("")

return (
    <AppContext.Provider value={{
        loggedIn,
        setLoggedIn
    }}>
        {children}
    </AppContext.Provider>
)
}
export function useAppContext() {
    return useContext(AppContext);
}