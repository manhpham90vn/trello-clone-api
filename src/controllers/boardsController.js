import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createBoard = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: 'API get list board' })
  } catch (error) {
    next(ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error.message))
  }
}

export const boardsController = {
  createBoard
}
