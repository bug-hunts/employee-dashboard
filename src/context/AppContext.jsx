import { createContext, useContext, useState, useEffect } from "react";

// Create context object
const AppContext = createContext();

export function AppProvider({ children }) {

    const [user, setUser] = useState({name :"Guest"});
    const [theme, setTheme] = useState(false);

    const toggletheme = () => setTheme((prev) => !prev);

        useEffect(() => {
        if (theme) {
        document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
                }
        
            }, [theme]);


    return (
        <AppContext.Provider value={{ user, setUser, theme, toggletheme }}>
            {children}

        </AppContext.Provider>
    );
}

//custom hook
export function useAppContext() {
    return useContext(AppContext);
}