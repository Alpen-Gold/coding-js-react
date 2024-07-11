import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit";

export const allDataSlice = createSlice({
  name: "data-store",
  initialState: {
    homeQuestions: [],
    allQuestions: [],
    question: [],
    loading: false,
    handleError: "",
    localCheked: JSON.parse(localStorage.getItem("masala-js")) || [],
  },
  reducers: {
    setHomeQuestionData: (state, action) => {
      state.homeQuestions = action.payload;
    },

    setAllQuestions: (state, action) => {
      state.allQuestions = action.payload;
    },
    setQuestion: (state, action) => {
      const findId = state.localCheked.find(
        (old) => old.id === action.payload.id
      );

      if (findId !== undefined) {
        state.question = {
          ...action.payload,
          completeCode: findId.completeCode,
          cheked: true,
        };
      } else {
        state.question = { ...action.payload, completeCode: "", cheked: false };
      }
    },

    handleLoading: (state, action) => {
      state.loading = action.payload;
    },

    handleError: (state, action) => {
      state.error = action.payload;
    },

    chekedQuestion: (state, action) => {
      const findId = state.localCheked.findIndex(
        (old) => old.id === action.payload.id
      );

      if (findId !== -1) {
        state.localCheked[findId].completeCode = action.payload.chekedCode;
      } else {
        state.localCheked.push({
          id: action.payload.id,
          completeCode: action.payload.chekedCode,
          cheked: true,
        });
      }
      localStorage.setItem("masala-js", JSON.stringify(state.localCheked));
    },
  },
});

export const {
  setHomeQuestionData,
  setAllQuestions,
  handleLoading,
  handleError,
  setQuestion,
  chekedQuestion,
} = allDataSlice.actions;

export default allDataSlice.reducer;
