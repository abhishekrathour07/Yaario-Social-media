// routes/storyRoutes.js
import express from "express";
import { createStory, deleteStory, getStories } from "../Controller/storyController.js";


const storyRouter = express.Router();

storyRouter.post("/story/create", createStory);
storyRouter.get("/story/getall", getStories);
storyRouter.delete("/story/delete/:storyId", deleteStory);

export default storyRouter;
