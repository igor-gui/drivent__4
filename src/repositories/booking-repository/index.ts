import { prisma } from "@/config";
import { CreateBookingParams } from "@/protocols";

async function getBookingByUserId(userId: number) {
    return await prisma.booking.findFirst({
        where: { userId }
    })
}
async function createBooking(booking: CreateBookingParams){
    return await prisma.booking.create({
        data: booking,
    })
}
const bookingRepositories = {
    getBookingByUserId,
    createBooking
}

export default bookingRepositories;