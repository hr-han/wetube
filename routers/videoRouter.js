import express from "express";
import routes from "../routes"
import { videoDetail} from "../controller/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;
