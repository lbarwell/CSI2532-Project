import { useState } from "react";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(
      new Date().toISOString().split("T")[0]
    );
    const [endDate, setEndDate] = useState(
      new Date().toISOString().split("T")[0]
    );

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
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            Start date
          </label>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max={endDate}
            defaultValue={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="form-control"
            id="validationCustom01"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            End date
          </label>
          <input
            type="date"
            min={startDate}
            defaultValue={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="form-control"
            id="validationCustom02"
            required
          />
        </div>

        <div className="col-3" style={{width: "100%", alignItems: "right"}}>
          <button
            className="btn btn-primary"
            style={{ width: "25%", marginTop: "2em" }}
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
