import React, { createContext } from 'react';

interface ThemeProviderProps {
    children: React.ReactNode,
}

interface Theme {
    statsBackground: string, 
    testedBackground: string,
    font: string,
}

const themeDefault: Theme = {
    statsBackground: "#7B829D",
    testedBackground: "#6495ED",
    font: "Nunito",
}

export const ThemeContext = createContext<Theme>(themeDefault);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <ThemeContext.Provider value={themeDefault}>
            {children}
        </ThemeContext.Provider>
    );
}


export default ThemeProvider;
