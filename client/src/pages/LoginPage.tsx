import { useContext } from "react";
import Navbar from "../components/Navbar";
import { LoginContext } from "../context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

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
          onClick={() => {
            setLoggedIn(true);
            console.log(isLoggedIn);
            navigate("/employees/1");
          }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
