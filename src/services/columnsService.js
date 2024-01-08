import { boardsModel } from '~/models/boardsModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const create = async (body) => {
  try {
    const newObj = {
      ...body
    }
    const result = await columnModel.createColumns(newObj)
    const column = await columnModel.findOneById(result.insertedId.toString())
    if (column) {
      column.cards = []
      await boardsModel.pushColumnOrderIds(column)
    }
    return column
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, body) => {
  try {
    const data = {
      ...body,
      updatedAt: Date.now()
    }
    const column = await columnModel.update(id, data)
    return column
  } catch (error) {
    throw new Error(error)
  }
}

const deleteColumn = async (id) => {
  try {
    await columnModel.deleteById(id)
    await cardModel.deleteManyByColumnId(id)
    return {
      result: 'Column and cards in column deleted successfully'
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const columnsService = {
  create,
  update,
  deleteColumn
}
