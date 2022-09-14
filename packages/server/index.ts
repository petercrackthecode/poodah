import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Pusher, { Options as PusherOptions } from 'pusher'

dotenv.config()

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
  encrypted: true,
}
const pusher = new Pusher(PUSHER_CONFIG)

app.get('/', (_: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.post('/message/create', (req: Request, res: Response) => {
  const payload = req.body
  pusher.trigger('chat', 'message', payload)
  res.status(200).send(payload)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
