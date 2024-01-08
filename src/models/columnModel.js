import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/utils'

const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),
  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createAt']

const validateBeforCreate = async (data) => {
  return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const createColumns = async (data) => {
  try {
    const validateData = await validateBeforCreate(data)
    const updatedData = {
      ...validateData,
      boardId: new ObjectId(validateData.boardId)
    }
    const column = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne(updatedData)
    return column
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    const column = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    return column
  } catch (error) {
    throw new Error(error)
  }
}

const pushCardOrderIds = async (card) => {
  try {
    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(card.columnId)
        },
        {
          $push: {
            cardOrderIds: new ObjectId(card._id)
          }
        },
        {
          returnDocument: 'after'
        }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (columnId, data) => {
  try {
    Object.keys(data).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete data[key]
      }
    })

    if (data.cardOrderIds) {
      data.cardOrderIds = data.cardOrderIds.map((id) => new ObjectId(id))
    }

    const result = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(columnId)
        },
        {
          $set: data
        },
        {
          returnDocument: 'after'
        }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteById = async (id) => {
  try {
    const column = await GET_DB()
      .collection(COLUMN_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) })
    return column
  } catch (error) {
    throw new Error(error)
  }
}

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createColumns,
  findOneById,
  pushCardOrderIds,
  update,
  deleteById
}
