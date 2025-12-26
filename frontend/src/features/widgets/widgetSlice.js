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
    editTitle: (state, action) => {
      const { id, name } = action.payload;
      const widget = state.widgets.find(w => w.id === id);
      if (widget) {
        widget.name = name;
        localStorage.setItem("widgets", JSON.stringify(state.widgets));
      }
    },
    updateWidget: (state, action) => {
      const { id, updates } = action.payload;
      const widget = state.widgets.find(w => w.id === id);
      if (widget) {
        Object.assign(widget, updates);
        localStorage.setItem("widgets", JSON.stringify(state.widgets));
      }
    },
  },
});

export const { toggleModal, addWidget, removeWidget, editTitle, updateWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
