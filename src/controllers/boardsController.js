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

const getBoardDetail = async (req, res, next) => {
  try {
    const board = await boardsService.getBoardDetail(req.params.id)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardsController = {
  createBoard,
  getBoardDetail
}
