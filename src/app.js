import express from "express";
import logger from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { localMiddleward } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);



app.use(helmet());
app.set('view engine', "pug")
app.set("views", path.join(__dirname, "views"))
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger("dev"));


app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session())

app.use(localMiddleward);


app.use(routes.home, globalRouter, userRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter)

export default app;

