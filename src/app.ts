import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./app/config";
import notFound from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes/routes";
import passport from "passport";
import "./app/config/passport";
import expressSession from "express-session";
export const app = express();

//middleware
app.use(
  expressSession({
    secret: config.EXPRESSSESSIONSECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [config.FRONTEND_URL],
    credentials: true,
  })
);

//routes
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Services Hub API",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
