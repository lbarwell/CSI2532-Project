import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TableView from "../components/tableView";
import EmployeeView from "../components/EmployeeView";
import { useParams } from "react-router-dom";
import { serverPort } from "../context";

interface Table {
  tableName: string;
  headers: string[];
  tableData: any[][];
}

interface Employee {
  first_name: string;
  last_name: string;
  name: string;
  role: string;
}

const EmployeePage = () => {
  const [table, setTable] = useState<Table>({
    tableName: "No data",
    headers: [],
    tableData: [],
  });
  const [activeView, setActiveView] = useState("reservations");
  const { employeeID } = useParams();
  const [employee, setEmployee] = useState<Employee>({
    first_name: "",
    last_name: "",
    name: "",
    role: "",
  });

  const getEmployee = async () => {
    try {
      const response = await fetch(
        `http://localhost:${serverPort}/employees/${employeeID}`
      );
      const jsonData = await response.json();

      console.log(jsonData);

      setEmployee(jsonData[0]);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const getReservations = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reservations`);
      const jsonData = await response.json();

      const headers = jsonData[0].keys();
      const [values] = jsonData.values();

      setTable({
        tableName: "reservations",
        headers: headers,
        tableData: values,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <EmployeeView
        first_name={employee.first_name}
        last_name={employee.last_name}
        hotel_name={employee.name}
        role={employee.role}
      />

      <ul className="nav nav-tabs" style={{ margin: "3em" }}>
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeView === "reservations" ? "active" : ""
            }`}
            onClick={() => {
              getReservations();
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
