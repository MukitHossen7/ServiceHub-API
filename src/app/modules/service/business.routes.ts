import express from "express";
import { serviceController } from "./service.controller";

const serviceRoute = express.Router();

serviceRoute.post("/", serviceController.createService);

export default serviceRoute;
