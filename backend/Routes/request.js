import express from 'express'
import { deleteFriendRequest, getAllFriendRequest, sendfriendRequest } from '../Controller/friendRequestController.js'

const requestRouter = express.Router()

requestRouter.post('/send-request', sendfriendRequest);
requestRouter.post("/delete-request", deleteFriendRequest);
requestRouter.get("/friend-requests", getAllFriendRequest)

export default requestRouter