import express from 'express'
import { getBioDetails, updateBioDetails } from '../Controller/bioController.js'

const bioRouter = express.Router()

bioRouter.get('/bio-detail', getBioDetails)
bioRouter.put('/update-bio', updateBioDetails)

export default bioRouter