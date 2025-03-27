import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Listing from "./Listing";
import HiltonImage from "../assets/hilton-montreal.avif";
import { useEffect, useState } from "react";

interface Hotel {
  id: number;
  name: string;
  chainid: number;
  streetNumber: number;
  streetName: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
  managerID: number;
}

const ListingView = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const getHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/hotels");
      const jsonData = await response.json();

      setHotels(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  console.log(hotels);

  return (
    <div style={{ margin: "1em" }}>
      <div className="container" style={{ margin: "1em" }}>
        <div className="row">
          <p className="col">
            {hotels.length} listing{hotels.length === 1 ? "" : "s"}
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
                <a className="dropdown-item" href="#">
                  Star rating
                </a>
              </li>
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
        {hotels.map((hotel) => (
          <div className="col" key={hotel.id}>
            <Listing
              imageSrc={HiltonImage}
              hotelID={hotel.id}
              hotelName={hotel.name}
              cityName={hotel.city}
              stateName={hotel.state}
              rating="unknown rating"
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
