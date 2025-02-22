import React, { useEffect, useRef, useState } from "react";
import {
  executeCode,
  getQuestion,
  getQuestionPog,
  getQuestions,
  getQuestionsForProsent,
} from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCircleCheck, FaHouse } from "react-icons/fa6";
import { useAsyncEffect } from "ahooks";
import { Select } from "antd";
import { LANGUAGE_VERSIONS } from "../constants/constants";
import { chekedQuestion } from "../store/slices/SliceDatas";
import Confetti from "https://cdn.skypack.dev/react-confetti@6.0.0";
import MenuItem from "antd/es/menu/MenuItem";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import EditorSection from "../components/CompletePage/EditorSection";
import ResultSection from "../components/CompletePage/ResultSection";
import ChatSection from "../components/CompletePage/ChatSection";
const languages = Object.keys(LANGUAGE_VERSIONS);

function CompletePage() {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const {
    question,
    loading,
    error,
    allQuestions,
    questionsForProtsent,
    localCheked,
    editorColor,
  } = useSelector((store) => store.allData);
  const { completeQuestion, questionId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(question.completeCode);
  const [lanSelect, setLanSelect] = useState(languages);
  const [lastLang, setLastLang] = useState("javascript");
  const [myResult, setMyResult] = useState(0);
  const [myResultText, setMyResultText] = useState("");
  const [allCheked, setAllCheked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fullEkran, setFullEkran] = useState(false);
  const [nextPre, setNextPre] = useState(
    localStorage.getItem("pog-masala-js") || 0
  );

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  useAsyncEffect(async () => {
    await getQuestion(dispatch, completeQuestion);
  }, [dispatch, completeQuestion]);

  useEffect(() => {
    if (arraysEqual(question.answers, myResult)) {
      setAllCheked(true);
      dispatch(
        chekedQuestion({
          id: question.id,
          chekedCode: code,
          typelang: lastLang,
        })
      );
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [myResult]);

  useEffect(() => {
    const index = allQuestions.findIndex(
      (item) => item.id === completeQuestion
    );
    localStorage.setItem("pog-masala-js", index);
    setNextPre(index);
  }, [allQuestions, completeQuestion]);

  const arraysEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  const runCode = async () => {
    const { run: result } = await executeCode(
      editorRef.current.getValue(),
      question.check,
      question.fun_name,
      lastLang,
      forTheChekLog
    );

    setMyResult(
      result.output
        .substr(0, result.output.length - 1)
        .split("\n")
        .map(Number || String)
    );

    setMyResultText(result.output)
  };

  const onlanSelectChange = (value) => {
    console.log(value);
    setLastLang(value);
  };

  const pogination = async (handlePH) => {
    await getQuestionsForProsent(dispatch, localCheked);
    await getQuestions(dispatch, questionId, localCheked);

    const indexQuestion = questionsForProtsent.findIndex(
      (item) => item.id === completeQuestion
    );

    setNextPre(allQuestions.findIndex((item) => item.id === completeQuestion));

    console.log(allQuestions[nextPre + 1], "firdavs");

    if (handlePH === "previous") {
      await getQuestionPog({
        dispatch,
        indexQuestion,
        navigate,
        questionId,
        handlePH,
      });
    } else {
      await getQuestionPog({
        dispatch,
        indexQuestion,
        navigate,
        questionId,
        handlePH,
      });
    }
  };

  const getDefaultValueForLanguage = (language, oldCode) => {
    // console.log(oldCode, "test");
    switch (language) {
      case "javascript":
        return (
          oldCode?.completeCode?.javascript ||
          `function ${question.fun_name} {\n\t//Sizga omad tilaymiz 😇 \n\n}`
        );
      case "python":
        return (
          oldCode.completeCode.python ||
          `def ${question.fun_name}:\n\t# Sizga omad tilaymiz 😇 \n\t\n`
        );
      case "java":
        return (
          oldCode.completeCode.java ||
          `public class Main {\n\tpublic static int ${question.fun_name} {\n\t\tSystem.out.println("Sizga omad tilaymiz 😇");\n\t}\n}`
        );
      case "php":
        const indexLobal = question.fun_name.indexOf("(");

        function convertString(input) {
          input = input.slice(1, -1);
          let elements = input.split(",");
          elements = elements.map((el) => `$${el.trim()}`);
          return `(${elements.join(", ")})`;
        }

        return (
          oldCode.completeCode.php ||
          `<?php\nfunction ${
            question.fun_name.slice(0, indexLobal).trim() +
            convertString(question.fun_name.slice(indexLobal))
          } {\n\t// Sizga omad tilaymiz 😇 \n}\n `
        );
      default:
        return "";
    }
  };

  const forTheChekLog = (sourceCode, check, startSize, lastLang) => {
    switch (lastLang) {
      case "javascript":
        return `${sourceCode} ${check
          .map((item) => {
            return `
      console.log(${startSize.slice(0, startSize.indexOf(" "))}(${item}))
    `;
          })
          .join("")}`;
      case "python":
        return `${sourceCode} ${check
          .map((item) => {
            return `
print(${startSize.slice(0, startSize.indexOf(" "))}(${item}))
    `;
          })
          .join("")}`;
      case "java":
        return `${sourceCode} ${check
          .map((item) => {
            return `
      System.out.println(${startSize.slice(
        0,
        startSize.indexOf(" ")
      )}(${item}));
    `;
          })
          .join("")}`;
      case "php":
        return `${sourceCode} ${check
          .map((item) => {
            return `
echo ${startSize.slice(0, startSize.indexOf(" "))}(${item}) . "\n";
    `;
          })
          .join("")} 
?>`;
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div className=" d-flex mt-4 justify-center">
        <div className="spinner"></div>
      </div>
    );
  if (error)
    return (
      <div className=" d-flex mt-4 justify-center text-red-600">
        You have problem or your connection is not working!
      </div>
    );

  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          wind={0.02}
        />
      )}
      <div className="set-bg-color" id="question-element">
        <div className="row" id="cards-question">

           <ResultSection
            fullEkran={fullEkran}
            navigate={navigate}
            questionId={questionId}
            nextPre={nextPre}
            allQuestions={allQuestions}
            pogination={pogination}
            question={question}
            myResult={myResult}
            myResultText={myResultText}
            setMyResult={setMyResult}
            setMyResultText={setMyResultText}
          />


          <div
            className={`card-question mt-5 m-xl-0 col-12 col-lg-12 ${
              fullEkran ? "col-xl-12" : "col-xl-6"
            }`}
          >
            <div className="d-flex justify-end mb-3">
              <button
                className="home btn  d-flex justify-center py-3 me-2 align-items-center"
                onClick={() => {
                  setFullEkran(!fullEkran);
                }}
              >
                {fullEkran ? (
                  <RiFullscreenExitLine className="fs-5" />
                ) : (
                  <RiFullscreenFill className="fs-5" />
                )}
              </button>

              <Select
                style={{
                  width: 150,
                }}
                value={lastLang}
                onChange={onlanSelectChange}
              >
                {lanSelect.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                    <FaCircleCheck
                      className={`isonTime ms-2 mt-[5px] fs-6 ${
                        question?.completeCode?.[city] ? "" : "d-none"
                      }`}
                    />
                  </MenuItem>
                ))}
              </Select>
            </div>
            {/* Editor Section */}
            <EditorSection
              lastLang={lastLang}
              editorColor={editorColor}
              getDefaultValueForLanguage={getDefaultValueForLanguage}
              question={question}
              editorRef={editorRef}
              onMount={onMount}
              setCode={setCode}
            />
            <div className="text-end">
              <button
                className="btn"
                id="checkedBtn"
                onClick={() => {
                  runCode();
                }}
              >
                Topshirish
              </button>
            </div>
          </div>
          <ChatSection />
        </div>
      </div>
    </>
  );
}

export default CompletePage;
