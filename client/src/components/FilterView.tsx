const FilterView = () => {
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

      <div className="container" style={{ padding: "0em", marginTop: "3em" }}>
        <p>
          <b>Price per night</b>
        </p>
        <div className="row">
          <div className="col form-floating mb-3">
            <input type="text" className="form-control" id="minInput" />
            <label htmlFor="minInput" style={{ marginLeft: "0.5em" }}>
              Min
            </label>
          </div>
          <div className="col form-floating mb-3">
            <input type="text" className="form-control" id="maxInput" />
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
          style={{ marginTop: "3em" }}
        >
          <b>Rating</b>
        </label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="5"
          id="ratingRange"
        />
      </div>

      <div>
        <label
          htmlFor="capacityRange"
          className="form-label"
          style={{ marginTop: "3em" }}
        >
          <b>Capacity</b>
        </label>
        <input
          type="range"
          className="form-range"
          min="1"
          max="30"
          id="capacityRange"
        />
      </div>

      <div>
        <label className="form-label" style={{ marginTop: "3em" }}>
          <b>Amenities</b>
        </label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="selectAllCheckbox"
          />
          <label className="form-check-label" htmlFor="selectAllCheckbox">
            Select all
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="poolCheckbox"
          />
          <label className="form-check-label" htmlFor="poolCheckbox">
            Pool
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="spaCheckbox"
          />
          <label className="form-check-label" htmlFor="spaCheckbox">
            Spa
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="kitchenCheckbox"
          />
          <label className="form-check-label" htmlFor="kitchenCheckbox">
            Kitchen
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="petFriendlyCheckbox"
          />
          <label className="form-check-label" htmlFor="petFriendlyCheckbox">
            Pet Friendly
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterView;
