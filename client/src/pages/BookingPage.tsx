import Navbar from "../components/Navbar";
import HotelPanel from "../components/HotelPanel";
import BookingForm from "../components/BookingForm";
import UserCreationForm from "../components/UserCreationForm";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  const { hotelID } = useParams();

  return (
    <>
      <Navbar />
      <div className="container" style={{ width: "80%", margin: "auto" }}>
        <div className="row">
          <div className="col-4">
            <HotelPanel roomID={Number(hotelID)} />
          </div>
          <div className="col">
            <BookingForm roomID={Number(hotelID)} />
            <UserCreationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
