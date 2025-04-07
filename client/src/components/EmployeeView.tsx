import { useParams } from "react-router-dom";

interface Props {
  first_name: string;
  last_name: string;
  hotel_name: string;
  role: string;
}

const EmployeeView = ({ first_name, last_name, hotel_name, role }: Props) => {
  const { employeeID } = useParams();

  return (
    <div
      className="card bg-body-tertiary"
      style={{
        margin: "3em",
        border: "0em",
        borderRadius: "1em",
        width: "20%",
      }}
    >
      <div className="card-body">
        <h5
          className="card-title"
          style={{ textAlign: "center", marginBottom: "1em" }}
        >
          Employee information
        </h5>
        <p className="card-text">
          <b>Name</b> - {first_name} {last_name}
        </p>
        <p className="card-text">
          <b>Location</b> - {hotel_name} ({role})
        </p>
        <p className="card-text">
          <b>Employee ID</b> - {employeeID}
        </p>
      </div>
    </div>
  );
};

export default EmployeeView;
