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

const update = async (req, res, next) => {
  try {
    const column = await columnsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}

const deleteColumn = async (req, res, next) => {
  try {
    const column = await columnsService.deleteColumn(req.params.id)
    res.status(StatusCodes.OK).json(column)
  } catch (error) {
    next(error)
  }
}

export const columnsController = {
  create,
  update,
  deleteColumn
}
