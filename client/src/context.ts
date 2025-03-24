import { createContext } from "react";

export const BookingContext = createContext({
    hotelID: 1,
    setHotelID: (value: number) => {}
});