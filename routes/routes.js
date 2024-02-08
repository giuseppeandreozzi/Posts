import Router from "express";
import * as postController from "../controller/post.js";
import multer from "multer";
import {json} from "express";
const routes = Router();
const storage = multer.memoryStorage()

routes.get("/", postController.getHome);

routes.post("/insertPost", multer({ storage: storage }).single("image"), postController.insertPost);

routes.post("/signup", json(), postController.postSignUp);

routes.post("/login", json(), postController.postLogIn);

export default routes;