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
  const [chain, setChain] = useState("Select");

  const filters = {
    minPrice: minPrice,
    maxPrice: maxPrice,
    minRating: rating,
    minCapacity: capacity,
    chain: chain === "Select" ? "" : chain,
  };

  const chains = ["Luxury Stays", "Budget Inn"];

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
          <b>Hotel chain</b>
        </label>

        <div className="col dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            style={{ width: "100%", textAlign: "center" }}
          >
            {chain}
          </button>

          <ul
            className="dropdown-menu"
            style={{ width: "100%", textAlign: "center" }}
          >
            {chains.map((chainName) => (
              <li key={chainName}>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    setChain(chainName);
                  }}
                >
                  {chainName}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterView;
