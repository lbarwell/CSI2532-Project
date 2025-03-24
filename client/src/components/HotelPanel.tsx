import HiltonImage from "../assets/hilton-montreal.avif";

interface Props {
  propHotelID: number;
}

const HotelPanel = ({ propHotelID }: Props) => {
  const listingInfo = {
    // Placeholder data, fetch the actual listing from the database
    id: propHotelID,
    imageSrc: HiltonImage,
    hotelName: "Hilton",
    cityName: "Montreal",
    stateName: "QC",
    rating: "4 stars",
    amenities:
      "Pool, Spa, Pet Friendly, Gym, Free Wifi, Kitchen, Bar, Restaurant, Breakfast",
    price: 135,
  };

  const amenitiesArray = listingInfo.amenities.split(", ");

  return (
    <div
      className="card bg-body-tertiary"
      style={{ marginTop: "1em", border: "none" }}
    >
      <img
        src={listingInfo.imageSrc}
        className="card-img-top"
        alt="Listing image"
      />
      <div className="container card-body">
        <div className="row">
          <div className="col">
            <h2 className="cardTitle" id="hotelName">
              {listingInfo.hotelName}
            </h2>
            <h5 className="card-text">
              {listingInfo.cityName}, {listingInfo.stateName}
            </h5>
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            {listingInfo.rating}
          </div>
        </div>
        <div className="row">
          <p style={{ textAlign: "justify", marginTop: "1em" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eget
            finibus turpis. Fusce congue nisl sit amet sem dictum, ac egestas
            orci ultrices. Sed ultricies sollicitudin egestas. Duis maximus odio
            lectus, ac facilisis nisl pulvinar dictum.
          </p>
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
          <h5>CAD ${listingInfo.price} per night (one bed)</h5>
        </div>
      </div>
    </div>
  );
};

export default HotelPanel;
