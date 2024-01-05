import { StatusCodes } from 'http-status-codes'
import { columnsService } from '~/services/columnsService'

const create = async (req, res, next) => {
  try {
    const column = await columnsService.create(req.body)
    res.status(StatusCodes.CREATED).json(column)
  } catch (error) {
    next(error)
  }
}

export const columnsController = {
  create
}
