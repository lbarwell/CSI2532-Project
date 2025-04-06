import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Listing from "./Listing";
import HiltonImage from "../assets/hilton-montreal.avif";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Hotel {
  amenities: string;
  city: string;
  hotel_number: number;
  name: string;
  price: number;
  hotel_room_id: number;
  state: string;
  rating: number;
}

const ListingView = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedSort, setSelectedSort] = useState("Name");

  const [searchParams] = useSearchParams();

  const destination = searchParams.get("destination");
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const capacity = searchParams.get("capacity");
  const rating = searchParams.get("minRating");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const chainName = searchParams.get("chain");

  const filters = {
    sort: "name",
    reverse: false,
    destination: destination === null ? "" : destination,
    start: startDate === null ? "" : startDate,
    end: endDate === null ? "" : endDate,
    capacity: capacity === null ? "" : capacity,
    rating: rating === null ? "" : rating,
    minPrice: minPrice === null ? "" : minPrice,
    maxPrice: maxPrice === null ? "" : maxPrice,
    chainName: chainName === null ? "" : chainName,
  };

  const getHotels = async (filters: {
    [key: string]: string | number | boolean;
  }) => {
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
    getHotels(filters);
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
                    filters.sort = "name";
                    filters.reverse = false;
                    getHotels(filters);
                  }}
                >
                  Name
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedSort("Rating");
                    filters.sort = "rating";
                    filters.reverse = true;
                    getHotels(filters);
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
                    filters.sort = "price";
                    filters.reverse = false;
                    getHotels(filters);
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
                    filters.sort = "price";
                    filters.reverse = true;
                    getHotels(filters);
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
              roomID={hotel.hotel_room_id}
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
