import { useContext } from 'react'
import { AppContext, AppContextInterface } from '../context'

export default function MessageViewer() {
  const { messages } = useContext(AppContext) as AppContextInterface
  return (
    <div className="message-viewer rounded-full">
      {messages && Object.keys(messages).map((id) => <p key={`message_${id}`}>{messages[id].content}</p>)}
    </div>
  )
}
