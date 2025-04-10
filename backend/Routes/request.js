import express from 'express'
import { acceptFriendRequest, deleteFriendRequest, getAllFriendRequest, sendfriendRequest } from '../Controller/friendRequestController.js'

const requestRouter = express.Router()

requestRouter.post('/send-request', sendfriendRequest);
requestRouter.post("/delete-request", deleteFriendRequest);
requestRouter.post("/accept-request", acceptFriendRequest);
requestRouter.get("/friend-requests", getAllFriendRequest)

export default requestRouter