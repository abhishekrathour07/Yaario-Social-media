import express from 'express'
import { like } from '../Controller/likeController.js'

const  likeRouter = express.Router()

likeRouter.put("/post/like",like);

export default likeRouter