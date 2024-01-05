import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const create = async (body) => {
  try {
    const newObj = {
      ...body
    }
    const result = await cardModel.createCard(newObj)
    const card = await cardModel.findOneById(result.insertedId.toString())
    if (card) {
      await columnModel.pushCardOrderIds(card)
    }
    return card
  } catch (error) {
    throw new Error(error)
  }
}

export const cardsService = {
  create
}
