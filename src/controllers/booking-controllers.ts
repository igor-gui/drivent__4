import { AuthenticatedRequest } from '@/middlewares';
import bookingServices from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getBookingByUserId(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const booking = await bookingServices.getBookingByUserId(userId);
        return res.status(200).send(booking);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({})
    }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
    const { userId, body, params } = req;
    try {
        const booking = await bookingServices.verifyBookingDataBeforeCreate(userId, Number(params.hotelId), body);
        return res.status(200).send(booking);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({})
    }
}
