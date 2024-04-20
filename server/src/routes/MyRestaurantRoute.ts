import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

// Configure storage for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// Route to fetch reservations for the authenticated user's restaurant
router.get(
  "/reservations",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyRestaurantReservations
);

// Route to update reservation time for a specific reservation
router.patch(
  "/reservation/:reservationId/time",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateReservationTime
);

// Route to fetch the authenticated user's restaurant details
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// Route to create a new restaurant for the authenticated user
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

// Route to update the authenticated user's restaurant details
router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
