import { asyncThunkCreator, createSlice } from "@reduxjs/toolkit";
import { LANGUAGE_VERSIONS } from "../../constants/constants";

export const allDataSlice = createSlice({
  name: "data-store",
  initialState: {
    homeQuestions: [],
    allQuestions: [],
    question: [],
    loading: false,
    handleError: "",
    localCheked: JSON.parse(localStorage.getItem("masala-js")) || [],
    questionsForProtsent: [],
    editorColor: true,
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
        state.question = {
          ...action.payload,
          completeCode: {
            javascript: "",
            java: "",
            php: "",
            python: "",
          },
          cheked: false,
        };
      }
    },
    setQuestionsForProtsent: (state, action) => {
      state.questionsForProtsent = action.payload;
    },

    handleLoading: (state, action) => {
      state.loading = action.payload;
    },

    handleError: (state, action) => {
      state.error = action.payload;
    },

    handleEditorColor: (state, action) => {
      state.editorColor = action.payload;
    },

    chekedQuestion: (state, action) => {
      const findId = state.localCheked.findIndex(
        (old) => old.id === action.payload.id
      );

      if (findId !== -1) {
        state.localCheked[findId].completeCode = {
          ...state.localCheked[findId]?.completeCode,
          [action.payload.typelang]: action.payload.chekedCode,
        };
      } else {
        state.localCheked.push({
          id: action.payload.id,
          completeCode: {
            ...{
              javascript: "",
              java: "",
              php: "",
              python: "",
            },
            [action.payload.typelang]: action.payload.chekedCode,
          },
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
  setQuestionsForProtsent,
  handleEditorColor,
} = allDataSlice.actions;

export default allDataSlice.reducer;
