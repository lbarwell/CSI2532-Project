import { useNavigate } from "react-router-dom";
import { serverPort } from "../context";

interface Props {
  tableName: string;
  headers: string[];
  data: any[][];
}

const tableView = ({ tableName, headers, data }: Props) => {
  const navigate = useNavigate();

  const onBook = (roomID: string) => {
    navigate(`/booking/${roomID}`);
  };

  const onDelete = async (name: string, id: string) => {
    try {
      await fetch(`http://localhost:${serverPort}/${name}/${id}`, {
        method: "DELETE",
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const onUpdate = async (name: string, id: string, status: string) => {
    try {
      const newStatus = status === "reserved" ? "active" : "archived";
      const body = { newStatus };

      await fetch(`http://localhost:${serverPort}/${name}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "2em" }}>
      <h2>{tableName}</h2>

      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr>
              {row.map((cell) => (
                <td>{cell}</td>
              ))}

              {tableName === "rooms" ? (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onBook(row[0])}
                  >
                    Book
                  </button>
                </td>
              ) : (
                ""
              )}

              {tableName === "hotels" ? (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onDelete("hotels", row[0])}
                  >
                    Delete
                  </button>
                </td>
              ) : (
                ""
              )}

              {tableName === "users" ? (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onDelete("users", row[0])}
                  >
                    Delete
                  </button>
                </td>
              ) : (
                ""
              )}

              {tableName === "reservations" ? (
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => onUpdate("reservations", row[0], row[3])}
                  >
                    Update
                  </button>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableView;
