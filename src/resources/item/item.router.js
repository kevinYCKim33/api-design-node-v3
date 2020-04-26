import { Router } from 'express'

const controller = (req, res) => {
  res.send({ message: 'helloz' })
}

const router = Router()

// have route blind to where it's mounted to
// /api/item
router
  .route('/')
  .get(controller)
  .post(controller)

router
  .route('/:id')
  .put(controller)
  .delete(controller)
  .get(controller)

// MY ATTEMPT
// router
//   .route('/')
//   .get((req, res) => res.send({ message: 'hello' }))
//   .post((req, res) => res.send({ message: 'hello' }))

// router
//   .route('/:id')
//   .post((req, res) => res.send({ message: 'hello' }))
//   .put((req, res) => res.send({ message: 'hello' }))
//   .delete((req, res) => res.send({ message: 'hello' }))

export default router
