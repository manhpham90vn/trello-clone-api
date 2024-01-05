import express from 'express'
import { cardsController } from '~/controllers/cardsController'
import { cardsValidation } from '~/validations/cardsValidation'

const Router = express.Router()

Router.route('/').post(cardsValidation.create, cardsController.create)

export const cardsRoute = Router
