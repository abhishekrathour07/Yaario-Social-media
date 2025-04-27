import express from 'express'
import { friendSuggestion, getLoginUserDetail, getProfileDetail } from '../Controller/suggestionController.js';

const SuggestionRouter = express.Router();

SuggestionRouter.get("/user-detail", getLoginUserDetail);
SuggestionRouter.get("/profile/:userId", getProfileDetail);
SuggestionRouter.get("/friend-suggestion", friendSuggestion)

export default SuggestionRouter