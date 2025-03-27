interface Props {
  tableName: string;
  headers: string[];
  data: {
    roomID: number;
    userID: number;
    firstName: string;
    lastName: string;
  }[];
}

const tableView = ({ tableName, headers, data }: Props) => {
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
          {data.map((item) => (
            <tr>
              <td>{item.roomID}</td>
              <td>{item.userID}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableView;
