import { StatusCodes } from 'http-status-codes'
import { boardsService } from '~/services/boardsService'

const createBoard = async (req, res, next) => {
  try {
    const createBoard = await boardsService.createBoard(req.body)
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

export const boardsController = {
  createBoard
}
