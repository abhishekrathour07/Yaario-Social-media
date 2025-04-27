import express from 'express'
import { getNotificationsById, getNotificationsByUser, markAllasRead, markSingleRead } from '../controller/notificationController.js'

const notificationRouter = express.Router()

notificationRouter.get("/notifications",getNotificationsByUser);
notificationRouter.put("/notifications/markall-read",markAllasRead);
notificationRouter.get("/single-notification/:notificationId",getNotificationsById);
notificationRouter.put("/notifications/:notificationId",markSingleRead);

export default notificationRouter