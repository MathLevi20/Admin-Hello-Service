import React, { createContext, ReactElement, ReactNode, useState } from 'react'

interface LoginProviderProps {
  children: React.ReactNode
}

//Função que constroe o Provider e também permite Consumir os Dados Globais
export const AuthContext = createContext({ auth: true, setAuth: {} })

//Componente Provider para passar os valores para os Childrens
const AuthProvider = ({ children }: LoginProviderProps) => {
  const [auth, setAuth] = useState(false)

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthProvider
