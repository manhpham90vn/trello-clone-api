import { StatusCodes } from 'http-status-codes'
import { boardsService } from '~/services/boardsService'

const create = async (req, res, next) => {
  try {
    const board = await boardsService.create(req.body)
    res.status(StatusCodes.CREATED).json(board)
  } catch (error) {
    next(error)
  }
}

const detail = async (req, res, next) => {
  try {
    const board = await boardsService.detail(req.params.id)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

export const boardsController = {
  create,
  detail,
  update
}
