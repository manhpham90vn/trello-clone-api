import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/Constants'

const create = async (req, res, next) => {
  const condition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be less than or equal to 50 characters long',
      'any.required': 'Title is required',
      'string.trim': 'Title must not have white spaces'
    }),
    description: Joi.string()
      .required()
      .min(3)
      .max(256)
      .trim()
      .strict()
      .messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 3 characters long',
        'string.max':
          'Description must be less than or equal to 256 characters long',
        'any.required': 'Description is required',
        'string.trim': 'Description must not have white spaces'
      }),
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .default(BOARD_TYPES.PUBLIC)
  })
  try {
    await condition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const boardsValidation = {
  create
}
