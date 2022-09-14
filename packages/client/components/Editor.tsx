import { BiSmile } from 'react-icons/bi'
import { MdSend } from 'react-icons/md'
import { useState, useContext, ChangeEvent, KeyboardEvent } from 'react'
import { AppContext, Messages } from '../context'
// Use the timestamp uuid to avoid collisions
import { v1 as uuidv1 } from 'uuid'

export default function Editor() {
  const { messages, setMessages } = useContext(AppContext)
  const [typedMessage, setTypedMessage] = useState<string>('')

  //
  const sendNewMessage = () => {
    let id = uuidv1()
    while (messages && id in messages) {
      id = uuidv1()
    }
    setMessages &&
      setMessages((prevMessages: Messages | null) => ({
        ...prevMessages,
        [id.toString()]: { content: typedMessage },
      }))
    setTypedMessage('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendNewMessage()
    }
  }

  return (
    <div className="editor w-full bg-transparent flex flex-row">
      <div className="w-full h-fit bg-slate-100 flex flex-row space-x-4 justify-between items-center p-2 rounded-full">
        <BiSmile className="text-slate-500 text-3xl cursor-pointer" />
        <textarea
          className="editor-textarea bg-transparent w-auto resize-none leading-10 h-10 grow m-0 focus:outline-none"
          placeholder="Type a message"
          value={typedMessage}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setTypedMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <MdSend
          className="text-slate-500 text-5xl cursor-pointer rounded-full p-2 text-white bg-sky-400"
          onClick={(event) => {
            event.preventDefault()
            sendNewMessage()
          }}
        />
      </div>
    </div>
  )
}
