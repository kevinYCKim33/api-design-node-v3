/*
C - models.create(), new model()

R - model.find(), model.findOne(), model.findById()

U - model.update(), model.findByIdAndUpdate(), model.findOneAndUpdate()

D - model.remove(), model.findByIdAndRemove(), model.findOneAndRemove()

*/

export const getOne = model => async (req, res) => {
  const id = req.params.id // comes from /api/item/:id
  const userId = req.user._id // comes from just some rando user: {_id: user} field

  const doc = await model.findOne({ _id: id, createdBy: userId }).exec()
  // _id every instance of a model will have an _id in mongoose db
  // see item.models.js for createdBy
  // we stated that an item will belong to a user with createdBy
  if (!doc) {
    return res.status(404).end()
  }

  res.status(200).json({ data: doc }) // status can be implied, but he was too strict with tests
}

export const getMany = model => async (req, res) => {}

export const createOne = model => async (req, res) => {}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
