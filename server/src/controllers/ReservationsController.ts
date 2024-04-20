import { Request, Response } from "express";
import Reservation from "../models/reservation";
import Restaurant from "../models/restaurant";
import User from "../models/user";

// Fetch reservations for the authenticated user
const getMyReservations = async (req: Request, res: Response) => {
  try {
    // Fetch reservations for the authenticated user
    const reservations = await Reservation.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Create a new reservation
const createReservation = async (req: Request, res: Response) => {
  try {
    const { reservationTime, tableNumber, restaurantId } = req.body;

    // Find the restaurant
    const restaurant = await Restaurant.findById("6623850a5ec7257c80447dc7");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Create a new reservation
    const newReservation = new Reservation({
      user: req.userId,
      restaurant: restaurant,
      reservationTime,
      tableNumber,
    });

    await newReservation.save();

    res.json(newReservation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create reservation" ,error });
  }
};

export default {
  getMyReservations,
  createReservation,
};
