import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalOpen: false,
  widgets: (() => {
    try {
      return JSON.parse(localStorage.getItem("widgets") || "[]");
    } catch {
      return [];
    }
  })(),
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.modalOpen = action.payload;
    },
    addWidget: (state, action) => {
      state.widgets.push(action.payload);
      localStorage.setItem("widgets", JSON.stringify(state.widgets));
    },
    removeWidget: (state, action) => {
      state.widgets = state.widgets.filter(w => w.id !== action.payload);
      localStorage.setItem("widgets", JSON.stringify(state.widgets));
    },
  },
});

export const { toggleModal, addWidget, removeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
