import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "allTheEmployees",
  initialState: [],
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    updateEmployeeName: (state, action) => {
      const { employeeId, newEmployeeName } = action.payload;
      state.forEach((element) => {
        if (employeeId === element.id) {
          element.name = newEmployeeName;
        }
      });

      const employeeIdx = state.findIndex(
        (employee) => employee.id === employeeId
      );
      if (employeeIdx) {
        state[employeeIdx].name = newEmployeeName;
      }
    },
  },
});

export const { addEmployee, updateEmployeeName } = employeesSlice.actions;
export default employeesSlice.reducer;
