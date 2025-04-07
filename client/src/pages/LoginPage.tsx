import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { serverPort } from "../context";

const LoginPage = () => {
  const navigate = useNavigate();

  const [id, setID] = useState(0);
  const [error, setError] = useState(false);

  const getEmployeeID = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverPort}/employees/${id}`
      );
      const jsonData = await response.json();

      if (jsonData.length === 0) {
        setError(true);
      } else {
        navigate(`/employees/${id}`);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <form
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
            type="number"
            className="form-control"
            id="exampleFormControlInput1"
            onChange={(e) => setID(Number(e.target.value))}
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
            disabled
          />
        </div>

        <div className="mb-3">
          <p
            className={`${error ? "" : "d-none"}`}
            style={{ color: "darkred", textAlign: "center" }}
          >
            Invalid employee ID
          </p>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginTop: "1em" }}
          onClick={() => {
            getEmployeeID();
          }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
