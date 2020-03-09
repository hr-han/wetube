import express from "express";
import logger from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { localMiddleward } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"

const app = express();

app.use(helmet());
app.set('view engine', "pug")
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger("dev"));


app.use(localMiddleward);


app.use(routes.home, globalRouter,userRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

