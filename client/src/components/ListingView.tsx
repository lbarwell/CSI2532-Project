import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Listing from "./Listing";
import HiltonImage from "../assets/hilton-montreal.avif";
import { useEffect, useState } from "react";

interface Hotel {
  chain_number: number;
  city: string;
  email: string;
  hotel_number: number;
  manager_id: number;
  name: string;
  phone: string;
  state: string;
  street_name: string;
  street_number: number;
  zip_code: string;
  rating: number;
}

const ListingView = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const getHotels = async (filters: { [key: string]: string }) => {
    try {
      const params = new URLSearchParams(
        filters as Record<string, string>
      ).toString();
      console.log(`http://localhost:5000/hotels?${params}`);
      const response = await fetch(`http://localhost:5000/hotels?${params}`);
      const jsonData = await response.json();

      setHotels(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHotels({ sort: "rating" });
  }, []);

  return (
    <div style={{ margin: "1em" }}>
      <div className="container" style={{ margin: "1em" }}>
        <div className="row">
          <p className="col">
            {hotels.length} hotel{hotels.length === 1 ? "" : "s"}
          </p>
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
                <a
                  className="dropdown-item"
                  onClick={() => getHotels({ sort: "name" })}
                >
                  Name
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => getHotels({ sort: "rating" })}
                >
                  Star rating
                </a>
              </li>
              <li>
                <a className="dropdown-item">Price: low to high</a>
              </li>
              <li>
                <a className="dropdown-item">Price: high to low</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {hotels.map((hotel) => (
          <div className="col" key={hotel.hotel_number}>
            <Listing
              imageSrc={HiltonImage}
              hotelID={hotel.hotel_number}
              hotelName={hotel.name}
              cityName={hotel.city}
              stateName={hotel.state}
              rating={hotel.rating}
              amenities="unknown amenities"
              price={NaN}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingView;
