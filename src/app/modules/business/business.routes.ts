import express from "express";
import { businessControllers } from "./business.controller";

const businessRoute = express.Router();

businessRoute.post("/", businessControllers.createBusinessProfile);

export default businessRoute;
