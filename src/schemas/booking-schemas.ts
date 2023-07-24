import { Booking } from '@prisma/client';
import joi, { number } from 'joi';

type CreateOrUpdateBooking = Pick<Booking, "roomId">

export const bookingSchema = joi.object<CreateOrUpdateBooking>({
    roomId: joi.number().required(),
})