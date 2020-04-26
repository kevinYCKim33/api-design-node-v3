import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

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

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
