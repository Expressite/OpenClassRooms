import { STATUS } from "../constants";
export const FilteredTasksList = (filter) => {
  return (state) =>
    state.tasks.filter(
      (item) =>
        filter === STATUS.ALL || item.completed === (filter === STATUS.FINISHED)
    );
};
