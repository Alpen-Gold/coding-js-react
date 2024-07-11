import axios from "axios";
import {
  handleError,
  handleLoading,
  setAllQuestions,
  setHomeQuestionData,
  setQuestion,
} from "../store/slices/SliceDatas";

const baseUrlEditor = axios.create({
  baseURL: "https://emkc.org/api/v2/piston/",
});

axios.defaults.baseURL = "https://5d20df6821c8800e.mokky.dev/";

export const getHomeQuestions = async (dispatch) => {
  dispatch(handleLoading(true));

  try {
    const response = await axios.get("categories");

    console.log(response.data, "categories");

    dispatch(setHomeQuestionData(response.data));
  } catch (error) {
    dispatch(handleError(error));
    dispatch(handleLoading(false));
  } finally {
    dispatch(handleLoading(false));
  }
};

export const getQuestions = async (dispatch, id, localCheked) => {
  dispatch(handleLoading(true));

  try {
    const response = await axios.get(`questions?category_id=${id}`);

    console.log(response.data, "questions");
    const newData = response.data.map((item) => {
      const localItem = localCheked.find((item1) => item1.id === item.id);

      if (localItem) {
        return {
          ...item,
          cheked: true,
          completeCode: localItem.completeCode,
        };
      } else {
        return {
          ...item,
          cheked: false,
          completeCode: "",
        };
      }
    });

    dispatch(setAllQuestions(newData));
  } catch (error) {
    dispatch(handleError(error));
    dispatch(handleLoading(false));
  } finally {
    dispatch(handleLoading(false));
  }
};

export const getQuestion = async (dispatch, id) => {
  dispatch(handleLoading(true));

  try {
    const response = await axios.get(`questions?id=${id}`);

    console.log(response.data, "question");

    dispatch(setQuestion(response.data[0]));
  } catch (error) {
    dispatch(handleError(error));
    dispatch(handleLoading(false));
  } finally {
    dispatch(handleLoading(false));
  }
};

export const executeCode = async (sourceCode, check, startSize) => {
  try {
    const checkList = `${sourceCode} ${check.map((item) => {
      return `
        console.log(${startSize.slice(0, startSize.indexOf(" "))}(${item}))
        `;
    })}`;

    console.log(checkList);
    const response = await baseUrlEditor.post("execute", {
      language: "javascript",
      version: "18.15.0",
      files: [
        {
          content: checkList,
        },
      ],
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error);
  }
};
