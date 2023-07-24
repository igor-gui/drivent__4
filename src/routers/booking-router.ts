import { createBooking, getBookingByUserId } from "@/controllers/booking-controllers";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { bookingSchema } from "@/schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken)
    .get('/booking', getBookingByUserId)
    .post('/booking', validateBody(bookingSchema), validateParams, createBooking)

export { bookingRouter };