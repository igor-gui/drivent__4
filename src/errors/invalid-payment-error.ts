import { ApplicationError } from "@/protocols";

export default function invalidPaymentError(): ApplicationError {
    return {
        name: "NOT PAID",
        message: "You must pay to continue"
    }
}