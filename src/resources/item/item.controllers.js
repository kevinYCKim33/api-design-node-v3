import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)

// syntax to write a slightly modified CRUD for an items controller
// export default {
//     ...crudControllers(Item),
//     getOne() {

//     }
// }
