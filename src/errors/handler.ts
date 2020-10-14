import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
  [key: string]: string[]
}

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {}

    error.inner.forEach((err) => {
      errors[err.path] = err.errors
    })
    return response.status(400).json({ message: 'Validation fails', errors })
  }
  // eslint-disable-next-line no-console
  console.error(error)
  return response.status(500).json({ message: 'Internal server error' })
}

export default errorHandler
