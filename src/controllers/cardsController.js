import { StatusCodes } from 'http-status-codes'
import { cardsService } from '~/services/cardsService'

const create = async (req, res, next) => {
  try {
    const card = await cardsService.create(req.body)
    res.status(StatusCodes.CREATED).json(card)
  } catch (error) {
    next(error)
  }
}

export const cardsController = {
  create
}
