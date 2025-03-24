import Navbar from "../components/Navbar";
import HotelPanel from "../components/HotelPanel";
import BookingForm from "../components/AvailabilityForm";
import UserCreationForm from "../components/UserCreationForm";

interface Props {
  propHotelID: number;
}

const BookingPage = ({ propHotelID }: Props) => {
  return (
    <>
      <Navbar />
      <div className="container" style={{ width: "80%", margin: "auto" }}>
        <div className="row">
          <div className="col-4">
            <HotelPanel propHotelID={propHotelID} />
          </div>
          <div className="col">
            <BookingForm />
            <UserCreationForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
