import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LogoContextType } from '../types';

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const useLogo = (): LogoContextType => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error('useLogo must be used within a LogoProvider');
  }
  return context;
};

interface LogoProviderProps {
  children: ReactNode;
}

export const LogoProvider: React.FC<LogoProviderProps> = ({ children }) => {
  const [logoType, setLogoType] = useState<'default' | 'landing'>('default');

  const value: LogoContextType = {
    logoType,
    setLogoType,
  };

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  );
};