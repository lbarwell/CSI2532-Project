import Navbar from "../components/Navbar";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <form
        action="#/employees/1"
        className="bg-body-tertiary"
        style={{
          margin: "auto",
          padding: "1em",
          width: "20%",
          borderRadius: "1em",
          marginTop: "10%",
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput2"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "1em" }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
