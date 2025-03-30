import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Listing from "./Listing";
import HiltonImage from "../assets/hilton-montreal.avif";
import { useEffect, useState } from "react";

interface Hotel {
  amenities: string;
  city: string;
  hotel_number: number;
  name: string;
  price: number;
  room_number: number;
  state: string;
  rating: number;
}

const ListingView = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const getHotels = async (filters: { [key: string]: string | boolean }) => {
    try {
      const params = new URLSearchParams(
        filters as Record<string, string>
      ).toString();

      const response = await fetch(`http://localhost:5000/hotelinfo?${params}`);
      const jsonData = await response.json();

      setHotels(jsonData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHotels({ sort: "name", reverse: false });
  }, []);

  const [selectedSort, setSelectedSort] = useState("Name");

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
              style={{ width: "100%", textAlign: "center" }}
            >
              {selectedSort}
            </button>

            <ul
              className="dropdown-menu"
              style={{ width: "100%", textAlign: "center" }}
            >
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedSort("Name");
                    getHotels({ sort: "name", reverse: false });
                  }}
                >
                  Name
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedSort("Star rating");
                    getHotels({ sort: "rating", reverse: true });
                  }}
                >
                  Star rating
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedSort("Price: low to high");
                    getHotels({ sort: "price", reverse: false });
                  }}
                >
                  Price: low to high
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedSort("Price: high to low");
                    getHotels({ sort: "price", reverse: true });
                  }}
                >
                  Price: high to low
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {hotels.map((hotel) => (
          <div className="col" key={hotel.hotel_number}>
            <Listing
              hotelID={hotel.hotel_number}
              hotelName={hotel.name}
              roomID={hotel.room_number}
              imageSrc={HiltonImage}
              cityName={hotel.city}
              stateName={hotel.state}
              rating={hotel.rating}
              amenities={hotel.amenities}
              price={hotel.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingView;
