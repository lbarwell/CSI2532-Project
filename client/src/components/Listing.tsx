import { useContext } from "react";
import { BookingContext } from "../context";

interface Props {
  imageSrc: string;
  hotelID: number;
  hotelName: string;
  cityName: string;
  stateName: string;
  rating: string;
  amenities: string;
  price: number;
}

const Listing = ({
  imageSrc,
  hotelID,
  hotelName,
  cityName,
  stateName,
  rating,
  amenities,
  price,
}: Props) => {
  const bookingContext = useContext(BookingContext);

  function buttonBookClicked() {
    bookingContext.setHotelID(hotelID);
    location.href = `/#/booking/${hotelID}`;
  }

  return (
    <div className="card">
      <img src={imageSrc} className="card-img-top" alt="Listing image" />
      <div className="container card-body">
        <div className="row">
          <div className="col">
            <h5 className="cardTitle" id="hotelName">
              {hotelName}
            </h5>
            <p className="card-text">
              {cityName}, {stateName}
            </p>
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            {rating}
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item" id="amenities">
          {amenities}
        </li>
        <li className="container list-group-item">
          <div className="row">
            <div className="col" id="price">
              <b>CA ${price}</b>
            </div>
            <div className="col"></div>
            <button className="col btn btn-primary" onClick={buttonBookClicked}>
              Book
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Listing;
