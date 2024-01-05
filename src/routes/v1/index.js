import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardsRoute } from './boardsRoute'
import { cardsRoute } from './cardsRoute'
import { columnsRoute } from './columnsRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 ready to use.' })
})

Router.use('/boards', boardsRoute)

Router.use('/columns', columnsRoute)

Router.use('/cards', cardsRoute)

export const APIs_V1 = Router
