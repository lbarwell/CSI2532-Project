import Navbar from "../components/Navbar";
import HiltonImage from "../assets/hilton-montreal.avif";

interface Props {
  propHotelID: number;
}

const BookingPage = ({ propHotelID }: Props) => {
  const listing = {
    // Placeholder data, fetch the actual listing from the database
    id: propHotelID,
    imageSrc: HiltonImage,
    hotelName: "Hilton",
    cityName: "Montreal",
    stateName: "QC",
    rating: "4 stars",
    amenities: "Pool",
    price: 135,
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: "auto",
          width: "50%",
          textAlign: "center",
          marginTop: "300px",
        }}
      >
        <h1>Booking</h1>
        <h2>Hotel ID: {propHotelID}</h2>
      </div>
    </>
  );
};

export default BookingPage;
