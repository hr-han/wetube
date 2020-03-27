import express from "express";
import routes from "../routes"
import { videoDetail, getUpload, postUpload, getEditVideo, postEditVideo, deleteVideo} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// Detail
videoRouter.get(routes.videoDetail(), videoDetail);

// Edit
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

// Delete
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);


export default videoRouter;
