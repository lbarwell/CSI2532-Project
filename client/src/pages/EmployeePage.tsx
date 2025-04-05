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
  const [table, setTable] = useState<Table>({tableName: "No data", headers: [], tableData: []});
  const [activeView, setActiveView] = useState("reservations");

  const getReservations = async() => {
    try {
      const response = await fetch(`http://localhost:5000/reservations`);
      const jsonData = await response.json();

      const headers = jsonData[0].keys()
      const [values] = jsonData.values()

      setTable({ tableName: "reservations", headers: headers, tableData: values});
    } catch (error: any) {
      console.error(error.message);
    }
  }

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
              getReservations();
              setActiveView("reservations")
            }}
          >
            Reservations
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === "hotels" ? "active" : ""}`}
            onClick={() => {
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
