import { useEffect, useState } from "react";

interface Amenity {
  text: string;
  isChecked: boolean;
}

const FilterView = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [capacity, setCapacity] = useState(11);
  const [rating, setRating] = useState(3);

  const data = [{ text: "Pool", isChecked: false }];

  useEffect(() => setAmenities(data), []);

  const onSelectAll = () => {
    for (const amenity of amenities) {
      amenity.isChecked = true;
    }

    setAmenities(amenities);
  };

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
              defaultValue={0}
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
              defaultValue={600}
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
          <b>Minimum capacity ({capacity} people)</b>
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
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="selectAllCheckbox"
            onClick={onSelectAll}
          />
          <label className="form-check-label" htmlFor="selectAllCheckbox">
            Select all
          </label>
        </div>

        {amenities.map((amenity) => (
          <div className="form-check" key={amenities.indexOf(amenity)}>
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id={"checkbox" + amenities.indexOf(amenity)}
            />
            <label
              className="form-check-label"
              htmlFor={"checkbox" + amenities.indexOf(amenity)}
            >
              {amenity.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterView;
