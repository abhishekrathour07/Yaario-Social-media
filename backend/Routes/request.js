import express from 'express'
import { acceptFriendRequest, deleteFriendRequest, getAllFriendRequest, getAllFriends, sendfriendRequest } from '../Controller/friendRequestController.js'

const requestRouter = express.Router()

requestRouter.post('/send-request', sendfriendRequest);
requestRouter.post("/delete-request", deleteFriendRequest);
requestRouter.post("/accept-request", acceptFriendRequest);
requestRouter.get("/friend-requests", getAllFriendRequest)
requestRouter.get("/friend-list", getAllFriends)

export default requestRouter