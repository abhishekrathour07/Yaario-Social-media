import express from 'express'
import { getNotificationsByUser } from '../Controller/notificationController.js'

const notificationRouter = express.Router()

notificationRouter.get("/notifications",getNotificationsByUser);

export default notificationRouter