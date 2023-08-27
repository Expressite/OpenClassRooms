import { useDispatch } from "react-redux";
import { updateEmployeeName } from "../store/employeeSlice";
import { useState } from "react";

function EmployeeListItem({ employee }) {
  //lire le state à partir du reducer tasks
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const handleToggleMode = (id) => {
    setEditMode(!editMode);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      const newName = e.target.value;
      dispatch(
        updateEmployeeName({
          employeeId: employee.id,
          newEmployeeName: newName,
        })
      );
    } else if (e.keyCode === 27) {
      setEditMode(false);
    }
  };

  return (
    <div>
      {editMode === true ? (
        <input
          type="text"
          autoFocus
          defaultValue={employee.name}
          onKeyDown={handleKeyDown}
        ></input>
      ) : (
        <span onClick={handleToggleMode}>{employee.name}</span>
      )}
    </div>
  );
}

export default EmployeeListItem;
