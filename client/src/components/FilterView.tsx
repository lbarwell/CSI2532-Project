import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterView = () => {
  const navigate = useNavigate();

  const onSearch = (filters: { [key: string]: any }) => {
    const params = new URLSearchParams(
      filters as Record<string, string>
    ).toString();

    navigate(`/search?${params}`);
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(600);
  const [rating, setRating] = useState(3);
  const [capacity, setCapacity] = useState(11);
  const [amenities, setAmenities] = useState<string[]>([]);

  const filters = {
    minPrice: minPrice,
    maxPrice: maxPrice,
    minRating: rating,
    minCapacity: capacity,
    amenities: amenities
  };

  const amenitiesValues = ["Pool", "TV", "Spa", "Kitchen", "Gym"];

  const addAmenity = (value: string) => {
    if (amenities.includes(value)) {
      const index = amenities.indexOf(value)

      console.log(amenities, amenities.splice(index, 1))

      setAmenities(amenities.splice(index, 1))
    } else {
      console.log(amenities, [value].concat(amenities))

      setAmenities([value].concat(amenities))
    }
  }

  return (
    <div
      className="bg-body-tertiary"
      style={{
        marginTop: "1em",
        marginBottom: "1em",
        padding: "1em",
        borderRadius: "1em",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Filters</h3>

      <button
        type="submit"
        className="col btn btn-primary"
        style={{ marginTop: "3em", width: "100%" }}
        onClick={() => onSearch(filters)}
      >
        Apply filters
      </button>

      <div className="container" style={{ padding: "0em", marginTop: "1em" }}>
        <p>
          <b>Price per night</b>
        </p>
        <div className="row">
          <div className="col form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="minInput"
              min={0}
              defaultValue={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <label htmlFor="minInput" style={{ marginLeft: "0.5em" }}>
              Min
            </label>
          </div>
          <div className="col form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="maxInput"
              min={0}
              defaultValue={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <label htmlFor="maxInput" style={{ marginLeft: "0.5em" }}>
              Max
            </label>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="ratingRange"
          className="form-label"
          style={{ marginTop: "1em" }}
        >
          <b>Minimum rating ({rating} stars)</b>
        </label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="5"
          id="ratingRange"
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>

      <div>
        <label
          htmlFor="capacityRange"
          className="form-label"
          style={{ marginTop: "1em" }}
        >
          <b>Minimum capacity ({capacity})</b>
        </label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="20"
          id="capacityRange"
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="form-label" style={{ marginTop: "1em" }}>
          <b>Amenities</b>
        </label>

        {amenitiesValues.map((amenity) => (
          <div className="form-check" key={amenitiesValues.indexOf(amenity)}>
            <input
              className="form-check-input"
              type="checkbox"
              id={"checkbox" + amenitiesValues.indexOf(amenity)}
              onClick={() => addAmenity(amenity)}
            />
            <label
              className="form-check-label"
              htmlFor={"checkbox" + amenities.indexOf(amenity)}
            >
              {amenity}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterView;
