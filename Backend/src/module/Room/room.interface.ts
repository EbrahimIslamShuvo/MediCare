export interface IRoom {

    roomNumber: string;

    roomType:
    | "General"
    | "ICU"
    | "Emergency"
    | "Cabin"
    | "VIP";

    floor: string;

    price: number;

    status?:
    | "Available"
    | "Occupied";
}