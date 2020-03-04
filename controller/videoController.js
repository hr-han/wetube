//import {videos} from "../db"

//import { getMovies } from "../db";
import routes from "../routes";
import Video from "../models/Video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        //res.render("home", { pageTitle: "Home", videos: getMovies() });
        res.render("home", { pageTitle: "Home", videos });        
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos:[] });        
    }
};

export const search = (req, res) => {
    //const searchingBy =req.query.term;
    const {query:{term:searchingBy}} = req
    return res.render("search", { pageTitle: "Search", searchingBy, videos })
};

export const getUpload = (req, res) =>
         res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
        const {
        body: { title, description },
        file: { path }
        } = req;
        console.log(title, description, path);

        // TODO: upload and save Video
        const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
        });

        console.log(newVideo);

        //res.render("upload", { pageTitle: "Upload" });
        res.redirect(routes.videoDetail(newVideo.id));
    };
    

export const video = (req, res) =>
         res.render("videos", { pageTitle: "Videos" });


export const videoDetail = async(req, res) => {
    const {
      params: {id}
    } = req;
    try {
        const video = await Video.findById(id);
        console.log(video);
        
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch(e) {
        console.log(e);
        res.redirect(routes.home);
    }
};

export const editVideo = (req, res) =>
         res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
         res.render("deleteVideo", { pageTitle: "Delete Video" });