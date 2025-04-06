import { useEffect, useState } from "react";
import HiltonImage from "../assets/hilton-montreal.avif";
import { serverPort } from "../context";

interface Props {
  roomID: number;
}

interface Room {
  amenities: string;
  city: string;
  extendable: boolean;
  imageSrc: any;
  name: string;
  price: number;
  rating: number;
  state: string;
  view: string;
}

const HotelPanel = ({ roomID }: Props) => {
  const [room, setRoom] = useState<Room>({
    amenities: "",
    city: "",
    extendable: false,
    imageSrc: HiltonImage,
    name: "",
    price: 0,
    rating: 0,
    state: "",
    view: "",
  });

  const getRoomInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverPort}/hotelinfo/${roomID}`
      );
      const jsonData = await response.json();

      setRoom(jsonData[0]);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getRoomInfo();
  }, []);

  const amenitiesArray = room.amenities.split(",");

  return (
    <div
      className="card bg-body-tertiary"
      style={{ marginTop: "1em", border: "none" }}
    >
      <img src={HiltonImage} className="card-img-top" alt="Listing image" />
      <div className="container card-body">
        <div className="row">
          <div className="col-9">
            <h2 className="cardTitle" id="hotelName">
              {room.name}
            </h2>
            <h5 className="card-text">
              {room.city}, {room.state}
            </h5>
          </div>
          <div className="col-3" style={{ textAlign: "right" }}>
            {room.rating} stars
          </div>
        </div>

        <div className="row">
          <p>{room.view}</p>
          <p>{room.extendable ? "Extendable room" : "Not extendable"}</p>
        </div>

        <div
          className="row row-cols-1 row-cols-md-2 g-4"
          style={{ marginTop: "0.5em" }}
        >
          {amenitiesArray.map((amenity) => (
            <div
              key={amenitiesArray.indexOf(amenity).toString()}
              className="col"
              style={{
                textAlign: "center",
                padding: "0em",
                marginTop: "0.5em",
              }}
            >
              <div
                style={{
                  height: "100%",
                  margin: "0.25em",
                  borderRadius: "1em",
                  backgroundColor: "white",
                }}
              >
                <p style={{ margin: "0em", paddingTop: "0.4em" }}>{amenity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row" style={{ textAlign: "center", marginTop: "2em" }}>
          <h5>CAD ${room.price} per night (one bed)</h5>
        </div>
      </div>
    </div>
  );
};

export default HotelPanel;
