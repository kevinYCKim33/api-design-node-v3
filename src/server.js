// order matters in routes written as well!
// first guy wins!

import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()
// app vs router are very similar
// routers cannot listen on a port...
// different router motivation: say some parts of your app has different auth priorities

// a leaf floating without it registering...
router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

// mount router above to /api
// sneaky way to nest routes
// GET /api/me ==> {me: 'hello'}
app.use('/api', router)

app.disable('x-powered-by')

// transforms request and goes in order...
app.use(cors()) // middleware  makes it cors enabled
// allow your api to be used by other servers
app.use(json()) // middleware: gets us to use req.body
// no need for manual stringifying and etc...
app.use(urlencoded({ extended: true })) //middleware
// transforms request to add params to an url... q?
app.use(morgan('dev')) // middleware;
// does all the logging

// custom middleware
// next: executes the next middleware if called upon
const log = (req, res, next) => {
  console.log('logging')
  next() // arg is error...but usually not put anything in...
  // unless it's auth and you want to error out
  // next() move onto the next thing
}

// will probably only use exact match or params matching
// /users; /users/:id

// app.use(log) // run log before all requests

// can also pass in arrays!
// middleware: don't respond, but mutate! shape!
app.get('/data', [log, log, log], (req, res) => {
  // run log just before you run (req, res)
  res.send({ message: 'hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body) // just echo back what was sent to BE
})

app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

// app.put('/data', (req, res) => {})

// app.delete()

// get all that CRUD going!

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
