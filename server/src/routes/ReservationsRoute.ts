import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import ReservationController from "../controllers/ReservationsController";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, ReservationController.getMyReservations);

router.post(
  "/",
  jwtCheck,
  jwtParse,
  ReservationController.createReservation
);

export default router;
