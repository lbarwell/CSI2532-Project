interface Props {
  tableName: string;
  headers: string[];
  data: any[][];
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
          {data.map((row) => (
            <tr>
              {row.map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default tableView;
