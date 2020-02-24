import express from "express";
import logger from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"

const app = express();

app.set('view engine', "pug")
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(logger("dev"));


app.use(routes.home, globalRouter,userRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

