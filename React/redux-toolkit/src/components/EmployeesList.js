import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addEmployee } from "../store/employeeSlice";
import EmployeeListItem from "./EmployeeListItem";
function EmployeesList({ filter }) {
  var employees = useSelector((state) => state.employees);

  const dispatch = useDispatch();

  const handleAddEmployee = () => {
    console.log("nouvel employé");
    const newEmployee = {
      id: Date.now(),
      name: "Nouvel employé",
    };
    dispatch(addEmployee(newEmployee));
  };

  return (
    <div>
      <button onClick={handleAddEmployee}>Nouvel employé</button>
      {employees.map((employee) => (
        <EmployeeListItem
          employee={employee}
          key={employee.id}
        ></EmployeeListItem>
      ))}
    </div>
  );
}

export default EmployeesList;
