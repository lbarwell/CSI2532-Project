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

const Listing = (listingInfo: Props) => {
  const bookingContext = useContext(BookingContext);

  function buttonBookClicked() {
    bookingContext.setHotelID(listingInfo.hotelID);
    location.href = `/#/booking/${listingInfo.hotelID}`;
  }

  return (
    <div className="card">
      <img
        src={listingInfo.imageSrc}
        className="card-img-top"
        alt="Listing image"
      />
      <div className="container card-body">
        <div className="row">
          <div className="col">
            <h5 className="cardTitle" id="hotelName">
              {listingInfo.hotelName}
            </h5>
            <p className="card-text">
              {listingInfo.cityName}, {listingInfo.stateName}
            </p>
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            {listingInfo.rating}
          </div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item" id="amenities">
          {listingInfo.amenities}
        </li>
        <li className="container list-group-item">
          <div className="row">
            <div className="col" id="price">
              <b>CA ${listingInfo.price}</b>
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
