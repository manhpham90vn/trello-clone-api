import express from 'express'
import { columnsController } from '~/controllers/columnsController'
import { columnsValidation } from '~/validations/columnsValidation'

const Router = express.Router()

Router.route('/').post(columnsValidation.create, columnsController.create)

Router.route('/:id')
  .put(columnsValidation.update, columnsController.update)
  .delete(columnsValidation.deleteColumn, columnsController.deleteColumn)

export const columnsRoute = Router
