import express from 'express'
import { like } from '../controller/likeController.js'

const  likeRouter = express.Router()

likeRouter.put("/post/like",like);

export default likeRouter