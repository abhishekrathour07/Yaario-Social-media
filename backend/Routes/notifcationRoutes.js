import express from 'express'
import { getNotificationsByUser, markAllasRead } from '../Controller/notificationController.js'

const notificationRouter = express.Router()

notificationRouter.get("/notifications",getNotificationsByUser);
notificationRouter.put("/notifications/markall-read",markAllasRead);

export default notificationRouter