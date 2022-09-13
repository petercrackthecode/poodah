import type { NextPage } from 'next'
import Editor from '../components/Editor'
import MessageViewer from '../components/MessageViewer'
import { useChannel } from '@harelpls/use-pusher'

const Home: NextPage = () => {
  return (
    <div className="home w-full h-full p-5 flex flex-col gap-4x">
      <MessageViewer />
      <Editor />
    </div>
  )
}

export default Home
