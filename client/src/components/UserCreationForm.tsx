import { useState } from "react";
import { serverPort } from "../context";
import { useNavigate } from "react-router-dom";

interface UserData {
  social_insurance_number: number;
  first_name: string;
  last_name: string;
  street_number: number;
  street_name: string;
  apt_number: number;
  city: string;
  state: string;
  zip_code: string;
  email: string;
  phone_number: number;
  creation_date: string;
}

interface Props {
  roomID: number;
  startDate: string;
  endDate: string;
}

const UserCreationForm = ({ roomID, startDate, endDate }: Props) => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState<boolean>(false);

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

  const [error, setError] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    social_insurance_number: 0,
    first_name: "",
    last_name: "",
    street_number: 0,
    street_name: "",
    apt_number: 0,
    city: "",
    state: "",
    zip_code: "",
    email: "",
    phone_number: 0,
    creation_date: new Date().toISOString().split("T")[0],
  });

  const onBook = () => {
    getAvailability({
      id: roomID,
      start: startDate,
      end: endDate,
    });

    if (
      userData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      ) === null
    ) {
      setError("Invalid email address provided");
    } else if (userData.phone_number.toString().length !== 10) {
      setError("Invalid phone_number number provided");
    } else if (userData.social_insurance_number.toString().length !== 9) {
      setError("Invalid social insurance number provided");
    } else if (availability !== true) {
      setError("room unavailable on the chosen dates");
    } else {
      setError("");
      createReservation(userData);

      navigate(`/`);
    }
  };

  const createReservation = async (userData: UserData) => {
    try {
      const body = userData;

      await fetch(`http://localhost:${serverPort}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      console.error(error.message);
    }

    try {
      const body = {
        customer: userData.social_insurance_number,
        hotel_room_id: roomID,
        status: "reserved",
        start_date: startDate,
        end_date: endDate,
        reservation_date: new Date().toISOString().split("T")[0],
      };

      await fetch(`http://localhost:${serverPort}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ marginTop: "1em", padding: "1em" }}>
      <h2>Book your stay</h2>
      <form className="row g-3 needs-validation" noValidate>
        <div className="col-md-6">
          <label htmlFor="validationCustom01" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom01"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, first_name: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom02" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom02"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, last_name: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-8">
          <label htmlFor="validationCustomUsername" className="form-label">
            Email
          </label>
          <div className="input-group has-validation">
            <span className="input-group-text" id="inputGroupPrepend">
              @
            </span>
            <input
              type="text"
              className="form-control"
              id="validationCustomUsername"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, email: e.target.value }));
              }}
              required
            />
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom02" className="form-label">
            Phone number
          </label>
          <input
            type="number"
            max={9999999999}
            className="form-control"
            id="validationCustom02"
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                phone_number: Number(e.target.value),
              }));
            }}
            required
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="validationCustom03" className="form-label">
            Street number
          </label>
          <input
            type="number"
            defaultValue={0}
            min={0}
            className="form-control"
            id="validationCustom03"
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                street_number: Number(e.target.value),
              }));
            }}
            required
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="validationCustom03" className="form-label">
            Street name
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, street_name: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom03"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, city: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationCustom05" className="form-label">
            State/Province
          </label>
          <input
            type="text"
            className="form-control"
            id="validationCustom05"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, state: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="validationCustom04" className="form-label">
            zip code
          </label>
          <input
            type="text"
            maxLength={6}
            className="form-control"
            id="validationCustom03"
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, zip_code: e.target.value }));
            }}
            required
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="validationCustom04" className="form-label">
            Social insurance number
          </label>
          <input
            type="number"
            min={0}
            max={999999999}
            className="form-control"
            id="validationCustom03"
            onChange={(e) => {
              setUserData((prev) => ({
                ...prev,
                social_insurance_number: Number(e.target.value),
              }));
            }}
            required
          />
        </div>

        <div className="col-9" style={{ marginTop: "2.5em" }}>
          <p
            className={`${error === "" ? "d-none" : ""}`}
            style={{ color: "darkred" }}
          >
            {error}
          </p>
        </div>

        <div className="col-3">
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "2em" }}
            onClick={onBook}
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreationForm;
