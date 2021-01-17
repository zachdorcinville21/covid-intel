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
    statsBackground: "linear-gradient( 135deg, #97ABFF 10%, #123597 100%)",
    testedBackground: "linear-gradient(315deg, #06bcfb 0%, #4884ee 74%)",
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
