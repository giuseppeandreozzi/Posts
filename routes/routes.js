import Router from "express";
import * as postController from "../controller/post.js";

const routes = Router();

routes.get("/", postController.getHome);

routes.post("/insertPost", postController.insertPost);

export default routes;