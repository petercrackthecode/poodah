import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { AppContext, AppContextInterface } from '../context'
import { useChannel, useEvent } from '@harelpls/use-pusher'

export default function MessageViewer() {
  const chatChannel = useChannel('chat')

  const { messages, setMessages } = useContext(AppContext) as AppContextInterface
  const [subscriptionCount, setSubscriptionCount] = useState<number | null | undefined>(
    useMemo(() => {
      return chatChannel?.subscriptionCount
    }, [chatChannel])
  )

  useEvent(chatChannel, 'message', (data: { id: string; content: string } | undefined) => {
    data &&
      setMessages((prevMessages) =>
        // only update the message queue if the message is not sent by the current user
        !prevMessages[data.id] ? { ...prevMessages, [data.id]: { content: data.content } } : prevMessages
      )
  })

  const getSubscriptionCount = useCallback(() => {
    chatChannel?.subscriptionCount && setSubscriptionCount(chatChannel.subscriptionCount)
  }, [chatChannel])

  useEffect(() => getSubscriptionCount, [getSubscriptionCount])

  useEvent(chatChannel, 'pusher:subscription_count', getSubscriptionCount)

  return (
    <div className="message-viewer rounded-full relative pt-5" style={{ marginBottom: '200px' }}>
      <div className="fixed top-2 left-0 right-0 bg-inherit">
        {' '}
        <div className="mx-auto w-fit text-white bg-green-400 py-1 px-2 rounded-full">
          {subscriptionCount ? `Online users: ${subscriptionCount}` : 'Loading online users...'}
        </div>
      </div>
      {messages &&
        Object.keys(messages).map((id) => (
          <p key={`message_${id}`} className="break-words">
            {messages[id].content}
          </p>
        ))}
    </div>
  )
}
