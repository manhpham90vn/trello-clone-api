import { boardsModel } from '~/models/boardsModel'
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

export const columnsService = {
  create
}
