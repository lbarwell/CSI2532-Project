import { useContext } from "react";
import Navbar from "../components/Navbar";
import TableView from "../components/tableView";
import { LoginContext } from "../context";

interface Props {
  isLoggedIn: boolean;
}

const EmployeePage = ({ isLoggedIn }: Props) => {
  const reservationInfo = [
    {
      roomID: 234,
      userID: 32,
      firstName: "Michael",
      lastName: "Scott",
    },
    {
      roomID: 222,
      userID: 4,
      firstName: "Cristiano",
      lastName: "Ronaldo",
    },
  ];

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
      <TableView
        tableName="Reservations"
        headers={["Room ID", "User ID", "First name", "Last name"]}
        data={reservationInfo}
      />
      <TableView
        tableName="Rooms"
        headers={["Hotel ID", "Room ID", "Reserved", "Service"]}
        data={reservationInfo}
      />
    </>
  );
};

export default EmployeePage;
