import React, { createContext, useState, ReactNode } from "react";

// Definição do tipo para o contexto
interface PageContextType {
  isPageOpen: boolean;
  theme: boolean;
  togglePage: () => void;
  themePage: () => void;
}

// Criação do contexto
const PageContext = createContext<PageContextType | undefined>(undefined);

// Provider do contexto
interface PageProviderProps {
  children: ReactNode;
}

const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [isPageOpen, setIsPageOpen] = useState(false);
  const [theme, setTheme] = useState(false);

  const togglePage = () => {
    setIsPageOpen(!isPageOpen);
  };
  const themePage = () => {
    setTheme(false);
  };
  const contextValue: PageContextType = {
    isPageOpen,
    togglePage,
    themePage,
    theme,
  };

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
};

export { PageContext, PageProvider };
