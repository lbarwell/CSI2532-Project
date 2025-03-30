import { useNavigate } from "react-router-dom";

interface Props {
  hotelID: number;
  hotelName: string;
  roomID: number;
  imageSrc: string;
  cityName: string;
  stateName: string;
  rating: number;
  amenities: string;
  price: number;
}

const Listing = (listingInfo: Props) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img
        src={listingInfo.imageSrc}
        className="card-img-top"
        alt="Listing image"
      />
      <div className="container card-body">
        <div className="row">
          <div className="col col-8">
            <h5 className="cardTitle" id="hotelName">
              {listingInfo.hotelName}
            </h5>
            <p className="card-text">
              {listingInfo.cityName}, {listingInfo.stateName}
            </p>
          </div>
          <div className="col col-4" style={{ textAlign: "right" }}>
            {listingInfo.rating} stars
          </div>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item" id="amenities">
          {listingInfo.amenities}
        </li>
        <li className="container list-group-item">
          <div className="row">
            <div className="col-8" id="price">
              <b>CA ${listingInfo.price}</b>
            </div>
            <button
              className="col-4 btn btn-primary"
              onClick={() => navigate(`/booking/${listingInfo.roomID}`)}
            >
              Book
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Listing;
