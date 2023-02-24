import axios from "axios";
import { useEffect, useState } from "react";
const List = () => {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3000/users/list");

      console.log(result.data);
      setStudent(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="tableData">
      <h1>Student List</h1>
      <br />
      <div>
        <table className="tableheader">
          <tr className="tablerow">
            <th>
              <h2>Roll No</h2>
            </th>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Class</h2>
            </th>
            <th>
              <h2>Address</h2>
            </th>
          </tr>
          {student.map((list) => (
            <tr>
              <td className="tablecolumn">
                <h3>{list.roll_no}</h3>
              </td>
              <td className="tablecolumn">
                <h3>{list.name}</h3>
              </td>
              <td className="tablecolumn">
                <h3>{list.studied}</h3>
              </td>
              <td className="tablecolumn">
                <h3>{list.address}</h3>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};
export default List;
