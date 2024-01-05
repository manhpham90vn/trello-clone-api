import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardsController } from '~/controllers/boardsController'
import { boardsValidation } from '~/validations/boardsValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API get list board' })
  })
  .post(boardsValidation.create, boardsController.create)

Router.route('/:id')
  .get(boardsController.detail)
  .put(boardsValidation.update, boardsController.update)

export const boardsRoute = Router
