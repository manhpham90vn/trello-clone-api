import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { boardsModel } from '~/models/boardsModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/utils'

const create = async (body) => {
  try {
    const newObj = {
      ...body,
      slug: slugify(body.title)
    }
    const result = await boardsModel.createBoard(newObj)
    const board = await boardsModel.findOneById(result.insertedId.toString())
    return board
  } catch (error) {
    throw new Error(error)
  }
}

const detail = async (id) => {
  try {
    const board = await boardsModel.getBoardDetail(id)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }
    const result = cloneDeep(board)
    result.columns.forEach((column) => {
      column.cards = result.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      )
    })
    delete result.cards
    return result
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
    const board = await boardsModel.update(id, data)
    return board
  } catch (error) {
    throw new Error(error)
  }
}

const supportsMovingCard = async (body) => {
  try {
    await columnModel.update(body.prevColumneId, {
      cardOrderIds: body.prevCardOrderIds,
      updatedAt: Date.now()
    })

    await columnModel.update(body.nextColumneId, {
      cardOrderIds: body.nextCardOrderIds,
      updatedAt: Date.now()
    })

    await cardModel.update(body.currentCardId, {
      columnId: body.nextColumneId,
      updatedAt: Date.now()
    })
    return {
      updated: true
    }
  } catch (error) {
    throw new Error(error)
  }
}

export const boardsService = {
  create,
  detail,
  update,
  supportsMovingCard
}
