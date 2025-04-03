import { useState } from "react";

const SearchView = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <form style={{ margin: "1em", borderBottom: "solid lightgray" }}>
      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="destination" className="form-label">
              Destination
            </label>
            <input
              type="text"
              className="form-control"
              id="destination"
              placeholder="New York"
            />
          </div>

          <div className="col">
            <label htmlFor="endDateField" className="form-label">
              Start date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDateField"
              defaultValue={startDate}
              min={new Date().toISOString().split("T")[0]}
              max={endDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="col">
            <label htmlFor="endDateField" className="form-label">
              End date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDateField"
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="col mb-3">
            <label htmlFor="travellers" className="form-label">
              Travellers
            </label>
            <input
              type="number"
              className="form-control"
              id="travellers"
              min={1}
              max={20}
              defaultValue="1"
            />
          </div>

          <button
            type="submit"
            className="col btn btn-primary"
            style={{ height: "40%", margin: "2em" }}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchView;
