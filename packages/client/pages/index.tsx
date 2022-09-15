import type { NextPage } from 'next'
import Editor from '../components/Editor'
import MessageViewer from '../components/MessageViewer'

const Home: NextPage = () => {
  return (
    <div className="home w-full h-full p-5 flex flex-col relative gap-y-4">
      <MessageViewer />
      <Editor />
    </div>
  )
}

export default Home
