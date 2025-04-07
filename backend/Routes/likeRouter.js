import express from 'express'
import { like } from '../Controller/likeController.js'

const  likeRouter = express.Router()

likeRouter.get("/like",like);

export default likeRouter