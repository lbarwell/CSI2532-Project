import { useNavigate } from "react-router-dom";

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

  const onDelete = (name: string, id: string) => {};

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
                <button
                  className="btn btn-primary"
                  onClick={() => onBook(row[0])}
                >
                  Book
                </button>
              ) : (
                ""
              )}

              {tableName === "reservations" ? (
                <button
                  className="btn btn-primary"
                  onClick={() => onDelete("reservations", row[0])}
                >
                  Delete
                </button>
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
