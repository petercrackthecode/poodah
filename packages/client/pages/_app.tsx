import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { AppContextProvider } from '../context'
import { PusherProvider } from '@harelpls/use-pusher'
const pusherConfig = {
  // required config props
  clientKey: '32b2275ca54b94cc69c5',
  cluster: 'us3',
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
