const BookingForm = () => {
  return (
    <div
      style={{
        marginTop: "1em",
        paddingBottom: "2em",
        padding: "1em",
        borderBottom: "solid lightgrey",
      }}
    >
      <h2>Check availability</h2>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">
            Start date
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            End date
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustomUsername" className="form-label">
            Number of travellers
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              required
            />
          </div>
        </div>

        <div className="col-9" />
        <div className="col-3">
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "2em" }}
            type="submit"
          >
            Check
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
