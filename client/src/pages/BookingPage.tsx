import Navbar from "../components/Navbar";

interface Props {
  propHotelID: number;
}

const BookingPage = ({ propHotelID }: Props) => {
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
