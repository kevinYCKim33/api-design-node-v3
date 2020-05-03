import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item) // hey connect Item model to REST!

// syntax to write a slightly modified CRUD for an items controller
// export default {
//     ...crudControllers(Item),
//     getOne() {

//     }
// }
