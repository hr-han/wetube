import routes from "../routes";
import Video from "../models/Video"
import Comment from "../models/Comment";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({id:-1});
        //res.render("home", { pageTitle: "Home", videos: getMovies() });
        res.render("home", { pageTitle: "Home", videos });        
    } catch(error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos:[] });        
    }
};

export const search = async(req, res) => {
    //const searchingBy =req.query.term;
    const {query:{term:searchingBy}} = req
    let videos = []
    videos = await Video.find({ title: { $regex: searchingBy, $options:"i"}}).sort({ id: -1 });
    return res.render("search", { pageTitle: "Search", searchingBy, videos })
};

export const getUpload = (req, res) =>
         res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
        const {
          body: { title, description },
          file: { location }
        } = req;
        console.log(req.file);

        const newVideo = await Video.create({
          fileUrl: `${location}`,
          title,
          description,
          creator: req.user.id
        });
        req.user.videos.push(newVideo.id);
        req.user.save();
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
        const video = await Video.findById(id)
        .populate("creator")
        .populate("comments");
        //console.log(video);
        
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch(e) {
        console.log(e);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        console.log(`video.creator, req.user.id`);
        console.log(video.creator, req.user.id);
        
        if (video.creator != req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (e) {
        console.log(e);
        res.redirect(routes.home);
    }
}

export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body: {title, description}
    } = req;
    try {
        await Video.findOneAndUpdate({ id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (e) {
        console.log(e);
        res.redirect(routes.home);
    }
}

export const deleteVideo = async(req, res) => {
    const {
        params: { id }
    } = req;
    
    try {
        const video = await Video.findById(id);

        if (video.creator != req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndDelete(id);
            // TODO Users에 videos는 삭제 안해도됨??
            // await User.findOneAndUpdate(video.creator,{
            //     //...
            // })
        }
        
    } catch (e) {
        console.log(e);
    }
    res.redirect(routes.home);
}

// register video views
export const postRegisterView = async(req,res) => {
    const {
      params: { id }
    } = req;

    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200)
    } catch (error) {
        res.status(400)
       
    } finally {
        res.end();
    }
}
// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: {comment}
    // user
  } = req;
  
  console.log(id);
  console.log(comment);

  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
        text: comment
        // creator: user.id
    })

    console.log(newComment);
    
    video.comments.push(newComment.id);
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
         