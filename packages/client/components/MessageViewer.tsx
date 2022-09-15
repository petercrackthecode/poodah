import { useContext } from 'react'
import { AppContext, AppContextInterface } from '../context'
import { useChannel, useEvent } from '@harelpls/use-pusher'

export default function MessageViewer() {
  const { messages, setMessages } = useContext(AppContext) as AppContextInterface

  const chatChannel = useChannel('chat')
  useEvent(chatChannel, 'message', (data: { id: string; content: string } | undefined) => {
    data &&
      setMessages((prevMessages) =>
        // only update the message queue if the message is not sent by the current user
        !prevMessages[data.id] ? { ...prevMessages, [data.id]: { content: data.content } } : prevMessages
      )
  })

  return (
    <div className="message-viewer rounded-full" style={{ marginBottom: '200px' }}>
      {messages &&
        Object.keys(messages).map((id) => (
          <p key={`message_${id}`} className="break-words">
            {messages[id].content}
          </p>
        ))}
    </div>
  )
}
