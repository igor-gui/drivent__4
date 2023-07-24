import { ApplicationError } from "@/protocols";

export default function mustBePresence():ApplicationError{
    return {
        name: "RemoteTicket",
        message: "This is just for not remote events"
    }
}