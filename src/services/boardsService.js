import { boardsModel } from '~/models/boardsModel'
import { slugify } from '~/utils/utils'

const createBoard = async (body) => {
  try {
    const newBoard = {
      ...body,
      slug: slugify(body.title)
    }
    const result = await boardsModel.createBoard(newBoard)
    const board = await boardsModel.findOneById(result.insertedId.toString())
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const boardsService = {
  createBoard
}
