import express from 'express'
import { columnsController } from '~/controllers/columnsController'
import { columnsValidation } from '~/validations/columnsValidation'

const Router = express.Router()

Router.route('/').post(columnsValidation.create, columnsController.create)

export const columnsRoute = Router
