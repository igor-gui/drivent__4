import { prisma } from "@/config";
import { notFoundError } from "@/errors";
import invalidPaymentError from "@/errors/invalid-payment-error";
import mustBePresence from "@/errors/must-not-be-remote-error";
import { CreateBookingParams } from "@/protocols";
import bookingRepositories from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketsRepository from "@/repositories/tickets-repository";

async function getBookingByUserId(userId: number) {
    const booking = bookingRepositories.getBookingByUserId(userId)
    if (!booking) throw notFoundError();
    return booking;
}

async function verifyBookingDataBeforeCreate(userId: number, hotelId: number, bookingParams: CreateBookingParams) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    const { status, includesHotel, isRemote } = await getTypeAndStatus(enrollment.id);
    const hotel = (await hotelRepository.findRoomsByHotelId(hotelId));
    const room = hotel.Rooms.filter((room) => room.id);
    if (room.length === 0) {
        throw notFoundError();
    }
    if (status !== "PAID") {
        throw invalidPaymentError();
    }
    if (isRemote) {
        throw mustBePresence();
    }
    if (!includesHotel) {
        throw mustBePresence();
    }
    bookingRepositories.createBooking(bookingParams);
};

async function getTypeAndStatus(enrollmentId: number) {
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

    if (!ticket) throw notFoundError()

    const { status } = ticket;
    const { isRemote, includesHotel } = ticket.TicketType;

    return { status, isRemote, includesHotel };
}

const bookingServices = {
    getBookingByUserId,
    verifyBookingDataBeforeCreate
}

export default bookingServices;