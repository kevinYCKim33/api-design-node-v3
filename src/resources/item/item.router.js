import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

// /api/item
router
  .route('/')
  .get((req, res) => {
    // res.status(404).send({message: 'not found'})
    // res.status(404).json({ message: 'hello'})
    // THINK OF RESPONSE AS RETURN!
    // don't put anything after response
    // don't get clever like oh i'll do analytics after responding!
  })
  .get(controllers.getMany)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
