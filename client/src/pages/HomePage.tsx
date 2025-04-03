import Navbar from "../components/Navbar";
import HomePageImage from "../assets/home-page-rome.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [destination, setDestination] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const navigate = useNavigate();

  const onSearch = (filters: { [key: string]: string | number }) => {
    const params = new URLSearchParams(
      filters as Record<string, string>
    ).toString();

    navigate(`/search?${params}`);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${HomePageImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "91.2vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          className="container bg-body-tertiary"
          style={{
            width: "50%",
            padding: "1em",
            paddingLeft: "2em",
            paddingRight: "2em",
            borderRadius: "2em",
          }}
        >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="destination" className="form-label">
                Where to?
              </label>
              <input
                type="text"
                placeholder="New York"
                className="form-control"
                id="destination"
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

            <div className="col">
              <label htmlFor="travellersField" className="form-label">
                Travellers
              </label>
              <input
                type="number"
                className="form-control"
                defaultValue={1}
                min={0}
                max={15}
                id="travellersField"
                onChange={(e) => setTravellers(Number(e.target.value))}
              />
            </div>

            <button
              type="submit"
              className="col mb-3 btn btn-primary"
              style={{
                borderRadius: "0.5em",
                marginLeft: "0.5em",
                marginTop: "2em",
              }}
              onClick={() =>
                onSearch({ destination: destination, travellers: travellers })
              }
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
