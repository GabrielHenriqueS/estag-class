import express from 'express'
import 'express-async-errors'

import './database.js'
import InstanceError from './src/errors/InstanceError.js'
import routes from './src/routes/index.js'

const app = express()

app.use(express.json())

app.use(routes)

app.use((err, request, response, _) => {
  if( err instanceof InstanceError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: err.message
  })
})

app.listen(3000, () => {
  console.log('Server is running!')
})

export default app