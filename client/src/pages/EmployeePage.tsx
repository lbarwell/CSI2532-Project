import { useState } from "react";
import Navbar from "../components/Navbar";
import TableView from "../components/tableView";
import EmployeeView from "../components/EmployeeView";

interface Props {
  isLoggedIn: boolean;
}

interface Table {
  tableName: string;
  headers: string[];
  tableData: any[][];
}

const EmployeePage = ({ isLoggedIn }: Props) => {
  const reservationInfo = {
    tableName: "Reservations",
    headers: ["Room ID", "User ID", "First name", "Last name"],
    tableData: [
      [324, 32, "Michael", "Scott"],
      [222, 4, "Cristiano", "Ronaldo"],
    ],
  };

  const [table, setTable] = useState<Table>(reservationInfo);
  const [activeView, setActiveView] = useState("reservations");

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <h2 style={{ width: "20%", marginTop: "10%", margin: "auto" }}>
          <a href="#/login">Login</a> required
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <EmployeeView />

      <ul className="nav nav-tabs" style={{ margin: "3em" }}>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeView === "reservations" ? "active" : ""
            }`}
            onClick={() => {
              setTable(reservationInfo);
              setActiveView("reservations");
            }}
          >
            Reservations
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === "hotels" ? "active" : ""}`}
            onClick={() => {
              setTable({
                tableName: "Hotels",
                headers: ["Hotel name"],
                tableData: [["New Hotel"], ["Boston Hotel"]],
              });
              setActiveView("hotels");
            }}
          >
            Hotels
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === "rooms" ? "active" : ""}`}
            onClick={() => setActiveView("rooms")}
          >
            Rooms
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === "customers" ? "active" : ""}`}
            onClick={() => setActiveView("customers")}
          >
            Customers
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === "employees" ? "active" : ""}`}
            onClick={() => setActiveView("employees")}
          >
            Employees
          </button>
        </li>
      </ul>

      <TableView
        tableName={table.tableName}
        headers={table.headers}
        data={table.tableData}
      />
    </>
  );
};

export default EmployeePage;
