import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardsModel } from '~/models/boardsModel'
import ApiError from '~/utils/ApiError'
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

const getBoardDetail = async (id) => {
  try {
    const board = await boardsModel.getBoardDetail(id)
    const result = cloneDeep(board)
    result.columns.forEach((column) => {
      column.cards = result.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })
    delete result.cards
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const boardsService = {
  createBoard,
  getBoardDetail
}
