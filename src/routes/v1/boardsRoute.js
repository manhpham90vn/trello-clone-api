import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardsController } from '~/controllers/boardsController'
import { boardsValidation } from '~/validations/boardsValidation'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API get list board' })
  })
  .post(boardsValidation.createBoard, boardsController.createBoard)

Router.route('/:id')
  .get(boardsController.getBoardDetail)
  .put((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API update board by id' })
  })

export const boardRoute = Router
