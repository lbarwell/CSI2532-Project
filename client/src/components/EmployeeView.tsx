const EmployeeView = () => {
  const employee = {
    firstName: "Ryan",
    lastName: "Gosling",
    hotel: "Boston Hotel",
    role: "Clerk",
    ID: 123456,
  };

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
          <b>Name</b> - {employee.firstName} {employee.lastName}
        </p>
        <p className="card-text">
          <b>Location</b> - {employee.hotel} ({employee.role})
        </p>
        <p className="card-text">
          <b>Employee ID</b> - {employee.ID}
        </p>
      </div>
    </div>
  );
};

export default EmployeeView;
