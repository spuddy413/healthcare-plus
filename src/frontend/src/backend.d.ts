import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    serviceType: string;
    email: string;
    message: string;
    preferredDate: string;
    patientName: string;
    submissionTime: Time;
    phone: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    submitBooking(patientName: string, email: string, phone: string, serviceType: string, preferredDate: string, message: string): Promise<void>;
}
