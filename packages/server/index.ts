import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Pusher, { Options as PusherOptions } from 'pusher'

dotenv.config({ path: '.env.local' })

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

const app: Express = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: FRONTEND_URL }))

const PUSHER_CONFIG: PusherOptions = {
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || '',
  // useTLS: true,
}
const pusher = new Pusher(PUSHER_CONFIG)

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.post('/pusher/user-auth', (req, res) => {
  const socketId = req.body.socket_id

  // Replace this with code to retrieve the actual user id and info
  const user = {
    id: '12345',
    user_info: {
      name: 'John Smith',
    },
  }
  const authResponse = pusher.authenticateUser(socketId, user)
  res.send(authResponse)
})

app.post('/message/create', async (req: Request, res: Response) => {
  const payload = req.body
  pusher
    .trigger('chat', 'message', payload)
    .then(() => {
      return res.status(200).json(payload)
    })
    .catch((_error) => {
      console.log('_error = ', _error)
      return res.status(500).json({ _error })
    })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
