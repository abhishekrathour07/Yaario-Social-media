import express from 'express'
import { friendSuggestion, getLoginUserDetail } from '../Controller/suggestionController.js';

const SuggestionRouter = express.Router();

SuggestionRouter.get("/user-detail", getLoginUserDetail)
SuggestionRouter.get("/friend-suggestion", friendSuggestion)

export default SuggestionRouter