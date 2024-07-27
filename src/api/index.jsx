import axios from "axios";
import {
  handleError,
  handleLoading,
  setAllQuestions,
  setHomeQuestionData,
  setQuestion,
  setQuestionsForProtsent,
  setUser,
} from "../store/slices/SliceDatas";
import { LANGUAGE_VERSIONS } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

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
          completeCode: {
            javascript: "",
            java: "",
            php: "",
            python: "",
          },
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

export const getQuestionsForProsent = async (dispatch, localCheked) => {
  dispatch(handleLoading(true));

  try {
    const response = await axios.get(`questions`);

    console.log(response.data, "questions for the protsent");
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
          completeCode: {
            javascript: "",
            java: "",
            php: "",
            python: "",
          },
        };
      }
    });

    dispatch(setQuestionsForProtsent(newData));
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
export const executeCode = async (
  sourceCode,
  check,
  startSize,
  lastLang,
  forTheChekLog
) => {
  try {
    if (!LANGUAGE_VERSIONS[lastLang]) {
      throw new alert(`Unsupported language: ${lastLang}`);
    }

    const languageVersion = LANGUAGE_VERSIONS[lastLang];

    const checkList = `${sourceCode} ${check
      .map((item) => {
        return `
        console.log(${startSize.slice(0, startSize.indexOf(" "))}(${item}))
      `;
      })
      .join("")}`;

    console.log(forTheChekLog(sourceCode, check, startSize, lastLang));
    console.log(checkList, checkList);

    const response = await baseUrlEditor.post("execute", {
      language: lastLang,
      version: String(languageVersion),
      files: [
        {
          content: forTheChekLog(sourceCode, check, startSize, lastLang),
        },
      ],
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    alert(error);
  }
};

export const getQuestionPog = async (item) => {
  const { dispatch, indexQuestion, navigate, handlePH, questionId } = item;

  dispatch(handleLoading(true));

  try {
    const response = await axios.get(
      `questions?page=${
        handlePH === "previous" ? indexQuestion : indexQuestion + 2
      } &limit=1`
    );

    console.log(response.data, "question for pog");

    const id = response.data.items[0].id;

    navigate(`/${questionId}/${id}`);
    // dispatch(setQuestion(response.data[0]));
  } catch (error) {
    dispatch(handleError(error));
    dispatch(handleLoading(false));
  } finally {
    dispatch(handleLoading(false));
  }
};

// export const getUserOnLoad = async (dispatch) => {
//   try {
//     const accountDetails = await account.get();

//     dispatch(setUser(accountDetails));
//   } catch (error) {
//     alert(error);
//   }
// };

export const handleUserLogin = async (e, user, dispatch, navigate) => {
  e.preventDefault();

  try {
    const accountDetailse = await account.get();

    // log out shu erda
    if (accountDetailse) {
      console.log("test login kirgan !", accountDetailse);
      await account.deleteSession("current");
    }

    const response = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    dispatch(setUser(accountDetailse));

    navigate("/");

    console.log("login ", response);
  } catch (error) {
    alert(error);
  }
};

export const handleUserRegister = async (e, user, dispatch, navigate) => {
  e.preventDefault();

  try {
    try {
      await account.deleteSession("current");
    } catch (sessionError) {
      console.log("No active session found.");
    }

    const response = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    console.log("REGISTER!", response);

    await account.createEmailPasswordSession(user.email, user.password);

    const accountDetailse = await account.get();

    console.log("account detailse!", accountDetailse);

    dispatch(setUser(accountDetailse));
    navigate("/");
  } catch (error) {
    alert(error);
  }
};
