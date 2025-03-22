const SearchView = () => {
  return (
    <form style={{ margin: "1em", borderBottom: "solid lightgray" }}>
      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="destination" className="form-label">
              Destination
            </label>
            <input type="text" className="form-control" id="destination" />
          </div>
          <div className="col mb-3">
            <label htmlFor="dates" className="form-label">
              Dates
            </label>
            <input type="text" className="form-control" id="dates" />
          </div>
          <div className="col mb-3">
            <label htmlFor="travellers" className="form-label">
              Travellers
            </label>
            <input type="text" className="form-control" id="travellers" />
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
