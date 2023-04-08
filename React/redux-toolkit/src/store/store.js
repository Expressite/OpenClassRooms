import { configureStore } from "@reduxjs/toolkit";
//le nom donné au réducer est libre. Ici, on importera le reducer qui a été exporté dans taskSlice.js (ligne : export default tasksSlice.reducer;)
import tasksReducer from "./taskSlice";

const store = configureStore({
  reducer: {
    //dans cet exemple simple, il n'y a qu'un seul reducer mais une application plus complète pourrait en contenir plusieurs
    tasks: tasksReducer,
  },
});

export default store;
