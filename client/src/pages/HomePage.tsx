import Navbar from "../components/Navbar";
import HomePageImage from "../assets/home-page-rome.png";

const Home = () => {
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
          action="#/search"
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
              <label htmlFor="startDateField" className="form-label">
                Where to?
              </label>
              <input
                type="text"
                className="form-control"
                id="startDateField"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col">
              <label htmlFor="endDateField" className="form-label">
                Dates
              </label>
              <input
                type="text"
                className="form-control"
                id="endDateField"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Travellers
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
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
