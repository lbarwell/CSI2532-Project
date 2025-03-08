import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Listing from "./Listing";

interface Props {
  listings: {
    id: number;
    imageSrc: string;
    hotelName: string;
    cityName: string;
    stateName: string;
    rating: string;
    amenities: string;
    price: number;
  }[];
}

const ListingView = ({ listings }: Props) => {
  return (
    <div style={{ margin: "1em" }}>
      <div className="container" style={{ margin: "1em" }}>
        <div className="row">
          <p className="col">{listings.length} listings</p>
          <div className="col"></div>
          <div className="col dropdown">
            <p>Sort by</p>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "100%", textAlign: "right" }}
            >
              Star rating
            </button>
            <ul
              className="dropdown-menu"
              style={{ width: "100%", textAlign: "right" }}
            >
              <li>
                <a className="dropdown-item" href="#">
                  Price: low to high
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Price: high to low
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {listings.map((listing) => (
          <div className="col" key={listing.id}>
            <Listing
              imageSrc={listing.imageSrc}
              hotelName={listing.hotelName}
              cityName={listing.cityName}
              stateName={listing.stateName}
              rating={listing.rating}
              amenities={listing.amenities}
              price={listing.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingView;
