import { useState } from "react";
import { serverPort } from "../context";

interface Props {
  roomID: number;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const BookingForm = ({
  roomID,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  const [availability, setAvailability] = useState<boolean | null>(null);

  const getAvailability = async (filters: {
    [key: string]: string | number | boolean;
  }) => {
    try {
      const params = new URLSearchParams(
        filters as Record<string, string>
      ).toString();

      const response = await fetch(
        `http://localhost:${serverPort}/reservations?${params}`
      );
      const jsonData = await response.json();

      setAvailability(jsonData.length === 0);
    } catch (error: any) {
      console.error(error.message);
    }
  };

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
        <div className="col-6">
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

        <div className="col-6">
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

        <div className={"col-6"} style={{ marginTop: "2.5em" }}>
          <p
            className={`${availability === null ? "d-none" : ""}`}
            style={{ color: availability ? "green" : "darkred" }}
          >
            {availability ? "A" : "Not a"}vailable
          </p>
        </div>

        <div className="col-6">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "2em" }}
            onClick={() =>
              getAvailability({
                id: roomID,
                start: startDate,
                end: endDate,
              })
            }
          >
            Check
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
