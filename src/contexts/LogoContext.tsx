import React, { createContext, useContext, useState } from 'react'
import { LogoContextType } from '../types'

// إنشاء السياق
const LogoContext = createContext<LogoContextType | undefined>(undefined)

// مزود السياق
export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoType, setLogoType] = useState<'default' | 'landing'>('default')

  const value: LogoContextType = {
    logoType,
    setLogoType,
  }

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  )
}

// خطاف مخصص لاستخدام السياق
export const useLogo = (): LogoContextType => {
  const context = useContext(LogoContext)
  if (context === undefined) {
    throw new Error('useLogo must be used within a LogoProvider')
  }
  return context
}

export default LogoContext