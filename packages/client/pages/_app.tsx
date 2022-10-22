import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContextProvider } from '../context'
import { PusherProvider } from '@harelpls/use-pusher'
const pusherConfig = {
  // required config props
  clientKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  userAuthentication: {
    endpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/pusher/user-auth`,
    transport: 'ajax',
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <PusherProvider {...pusherConfig}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PusherProvider>
    </AppContextProvider>
  )
}

export default MyApp
