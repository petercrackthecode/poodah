import React, { createContext, useState, ReactNode } from 'react'
import Pusher from 'pusher-js'

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
  const pusher = new Pusher('32b2275ca54b94cc69c5', { cluster: 'us3' })
  const chatChannel = pusher.subscribe('chat')
  chatChannel.bind('new_message', (data: { id: string; content: string }) => {
    setMessages((prevMessages) => ({ ...prevMessages, [data.id]: { content: data.content } }))
  })

  return <AppContext.Provider value={{ messages, setMessages }}>{children}</AppContext.Provider>
}
