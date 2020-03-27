import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const handleOpen = () => console.log("✅  Connected to DB");
const handleError = () => console.log(`Error on DB Connection: ${error}`);

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;

db.once("open", handleOpen);
db.on("error", handleError);

// export const videos = [
//     {
//         id:123456, 
//         title:'Video aweasome', 
//         description:'This is something I love',
//         views:24,
//         videoFile:`https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
//         creator: {
//             id: 123456,
//             name:"han",
//             email:"han@gmail.com"
//         }
//     },
//     {
//         id: 222222,
//         title: 'Video Super',
//         description: 'This is something I love',
//         views: 24,
//         videoFile: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
//         creator: {
//             id: 123456,
//             name: "han",
//             email: "han@gmail.com"
//         }
//     },
//     {
//         id: 333333,
//         title: 'Video nice',
//         description: 'This is something I love',
//         views: 24,
//         videoFile: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
//         creator: {
//             id: 123456,
//             name: "han",
//             email: "han@gmail.com"
//         }
//     },
//     {
//         id: 111111,
//         title: 'Video perpect',
//         description: 'This is something I love',
//         views: 24,
//         videoFile: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
//         creator: {
//             id: 123456,
//             name: "han",
//             email: "han@gmail.com"
//         }
//     }
// ]

// DONT TOUCH THIS FILE <3

// import axios from "axios";
// let movies = [];
// const YIFY_URL = "https://yts.lt/api/v2/";
// const client = axios.create({
//     baseURL: YIFY_URL
// });
// const startDB = async () => {
//     try {
//         console.log("⏳  Starting Movie DB");
//         ({
//             data: {
//                 data: { movies }
//             }
//         } = await client.get("/list_movies.json", { params: { limit: 50 } }));
//         console.log("✅  Movie DB Ready!");
//     } catch (e) {
//         console.log(e.message);
//         console.log("❌ Can't initialize DB, contact Nico");
//     }
// };
// startDB();

// // This gives you an array of all the movies
// export const getMovies = () => movies;

// // This gives you one movie, don't forget to pass the ID
// export const getMovieById = id => {
//     if (!id) {
//         throw Error("❌  YOU FORGOT TO PASS THE MOVIE ID TO THE FUNCTION  ❌ ");
//     }
//     return movies.find(m => m.id === parseInt(id, 10));
// };

// // This gives you an array of movies with a release date of minimum X
// export const getMovieByMinimumYear = year => {
//     if (!year) {
//         throw Error("❌  YOU FORGOT TO PASS THE MOVIE YEAR TO THE FUNCTION  ❌");
//     }
//     return movies.filter(m => m.year >= year);
// };

// // This gives you an array of movies with a rating of minimum X
// export const getMovieByMinimumRating = rating => {
//     if (!rating) {
//         throw Error("❌  YOU FORGOT TO PASS THE MOVIE RATING TO THE FUNCTION  ❌");
//     }
//     return movies.filter(m => m.rating >= rating);
// };
