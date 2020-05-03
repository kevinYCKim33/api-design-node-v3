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

export const getMany = model => async (req, res) => {
  const docs = await model.find({ createdBy: req.user._id })
  res.status(200).json({ data: docs }) // namespace json! good practice!! usually data is good!
}

export const createOne = model => async (req, res) => {
  const doc = await model.create({ ...req.body, createdBy: req.user._id }) // clever spread op!
  res.status(201).json({ data: doc }) // well technically a 201
}

export const updateOne = model => async (req, res) => {
  const doc = await model.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id
    },
    req.body, // find em, then update them
    { new: true } // have to do this...otherwise won't get back the updated object... // odd...
  )

  if (!doc) {
    return res.status(400).end()
  }
  res.status(200).json({ data: doc })
}

export const removeOne = model => async (req, res) => {
  const doc = await model
    .findOneAndRemove(
      {
        _id: req.params.id,
        createdBy: req.user._id
      },
      req.body
    )
    .exec()

  if (!doc) {
    return res.status(400).end()
  }

  res.status(200).json({ data: doc })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
