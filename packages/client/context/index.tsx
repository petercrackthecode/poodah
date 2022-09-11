import React, { createContext, useState, ReactNode } from 'react'

export type Messages = {
  [id: string]: { content: string }
}

export interface AppContextInterface {
  messages: Messages
  setMessages: React.Dispatch<React.SetStateAction<Messages>>
}

export const AppContext = createContext<AppContextInterface>({ messages: {}, setMessages: () => {} })

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Messages>({})

  return <AppContext.Provider value={{ messages, setMessages }}>{children}</AppContext.Provider>
}
