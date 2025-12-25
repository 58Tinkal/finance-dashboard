import { configureStore } from "@reduxjs/toolkit";
import widgetReducer from "../features/widgets/widgetSlice";

export const store = configureStore({
  reducer: {
    widgets: widgetReducer,
  },
});
