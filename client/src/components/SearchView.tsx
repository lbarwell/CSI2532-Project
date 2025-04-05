import { useState } from "react";

const SearchView = () => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [capacity, setCapacity] = useState(1);

  const filters = {
    destination: destination,
    start: startDate,
    end: endDate,
    capacity: capacity,
  };

  const onSearch = (filters: { [key: string]: any }) => {
    const params = new URLSearchParams(
      filters as Record<string, string>
    ).toString();

    window.location.href = `/#/search?${params}`;
  };

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
              onChange={(e) => setDestination(e.target.value)}
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
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="travellers"
              min={1}
              max={20}
              defaultValue="1"
              onChange={(e) => setCapacity(Number(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="col btn btn-primary"
            style={{ height: "40%", margin: "2em" }}
            onClick={() => onSearch(filters)}
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchView;
