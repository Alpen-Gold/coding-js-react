import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/SliceDatas";

export const store = configureStore({
  reducer: {
    allData: dataReducer,
  },
});
