import express from "express";
import { serviceController } from "./service.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { zodValidateRequest } from "../../middlewares/zodValidateRequest";
import {
  createServiceZodSchema,
  updateServiceZodSchema,
} from "./service.zod.validation";

const serviceRoute = express.Router();

// POST - create service (Vendor / Admin)
serviceRoute.post(
  "/",
  checkAuth(Role.ADMIN, Role.VENDOR),
  zodValidateRequest(createServiceZodSchema),
  serviceController.createService
);

// GET - list all services (public)
serviceRoute.get("/", serviceController.getAllServices);

// GET - common service types (public)
serviceRoute.get("/common", serviceController.getCommonServices);

// Advanced search
serviceRoute.get("/search", serviceController.searchServices);

// GET - single service (public)
serviceRoute.get("/:id", serviceController.getSingleService);

// PATCH - update service (owner Vendor / Admin)
serviceRoute.patch(
  "/:id",
  checkAuth(Role.VENDOR, Role.ADMIN),
  zodValidateRequest(updateServiceZodSchema),
  serviceController.updateService
);

// DELETE - delete service (owner Vendor / Admin)
serviceRoute.delete(
  "/:id",
  checkAuth(Role.VENDOR, Role.ADMIN),
  serviceController.deleteService
);

export default serviceRoute;
