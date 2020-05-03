import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)

/*
GET / Read many
GET /:id Read one
POST / Create one
PUT /:id Update One
DELETE /:id Delete One
*/
