import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
      // unique: true; would be horrible cause the name needs to be unique across all index
      // someone probably wrote Clean Room on their To Do List
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    notes: String,
    due: Date,
    // basically how to set up relationship...
    // this field will use the id of a user
    // ref not req'd
    // population.mongo ~ joining tables at runtime
    // it's easier to read i guess...
    // ObjectId: how mongo does id's
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user', // see user.model.js export
      required: true
    },
    // this will belong to a list!
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    }
  },

  { timestamps: true }
)

// compound index
// if you try to make an item named 'Clean Room' on ToDo List #1, it will error out
// 1 what order do you want to sort your indexes?
// just sorting of indexes...
// don't think too much on it...
itemSchema.index({ list: 1, name: 1 }, { unique: true })
export const Item = mongoose.model('item', itemSchema)
