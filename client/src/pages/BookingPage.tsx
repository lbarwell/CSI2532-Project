import Navbar from "../components/Navbar";
import HotelPanel from "../components/HotelPanel";
import BookingForm from "../components/BookingForm";
import UserCreationForm from "../components/UserCreationForm";
import { useParams } from "react-router-dom";
import { useState } from "react";

const BookingPage = () => {
  const { hotelID } = useParams();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <>
      <Navbar />
      <div className="container" style={{ width: "80%", margin: "auto" }}>
        <div className="row">
          <div className="col-4">
            <HotelPanel roomID={Number(hotelID)} />
          </div>
          <div className="col">
            <BookingForm
              roomID={Number(hotelID)}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <UserCreationForm
              roomID={Number(hotelID)}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
