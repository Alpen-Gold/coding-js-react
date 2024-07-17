import React, { useEffect, useRef, useState } from "react";
import { executeCode, getQuestion } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaCircleCheck, FaHouse } from "react-icons/fa6";
import { useAsyncEffect } from "ahooks";
import { Editor } from "@monaco-editor/react";
import { Select } from "antd";
import { LANGUAGE_VERSIONS } from "../constants/constants";
import { chekedQuestion } from "../store/slices/SliceDatas";
import Confetti from "https://cdn.skypack.dev/react-confetti@6.0.0";
import MenuItem from "antd/es/menu/MenuItem";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
const languages = Object.keys(LANGUAGE_VERSIONS);

function CompletePage() {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const { localCheked, allQuestions, question, loading, error } = useSelector(
    (store) => store.allData
  );
  const { completeQuestion } = useParams();
  const [code, setCode] = useState(question.completeCode);
  const [lanSelect, setLanSelect] = useState(languages);
  const [lastLang, setLastLang] = useState("javascript");
  const [myResult, setMyResult] = useState(0);
  const [allCheked, setAllCheked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fullEkran, setFullEkran] = useState(false);

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

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

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
        .map(Number)
    );
  };

  const onlanSelectChange = (value) => {
    console.log(value);
    setLastLang(value);
  };

  const getDefaultValueForLanguage = (language, oldCode) => {
    console.log(oldCode, "test");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          <div
            className={`card-question col-12 col-lg-12 text-center text-xl-start ${
              fullEkran
                ? "col-xl-12 justify-center align-items-center flex-col d-flex"
                : "col-xl-6"
            }`}
          >
            <div className="btns d-flex">
              <button className="home btn  d-flex justify-center align-items-center">
                <FaHouse />
              </button>

              <button className="left-exit btn  d-flex justify-center align-items-center">
                <FaArrowLeft />
              </button>

              <button className="next-question btn">Keyingi</button>
              <button className="next-question btn">Orqaga</button>
            </div>

            <h1 id="question-title" className="my-3">
              {question?.fun_name &&
                question?.fun_name.slice(0, question?.fun_name.indexOf(" "))}
            </h1>

            <p>{question?.text}</p>

            <ul className="my-4 d-flex flex-column gap-3">
              {question?.examples?.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>

            <div className="d-flex gap-4 items-center justify-start my-3">
              <h3 className="m-0 p-0">Natijalar</h3>
              <div>
                <FaCircleCheck
                  className={`isonTime mt-[-10px] fs-5 ${
                    question?.cheked ? "" : "d-none"
                  }`}
                  id="goodQuestion"
                />
              </div>
            </div>

            <div className="bg-color-black p-4 rounded-3 questionCheck">
              <div>
                <div>
                  <h5 id="error" className="text-danger"></h5>
                </div>
                {question?.examples?.map((example, index) => (
                  <div
                    key={index}
                    className="py-2 m-0 d-flex align-items-center justify-content-between"
                  >
                    <p className="m-0 p-0">{example}</p>

                    <button
                      className={`btn ${
                        myResult === 0
                          ? " "
                          : myResult[index] === question.answers[index]
                          ? "bg-green"
                          : "bg-red"
                      }`}
                      id="resultBtn"
                    >
                      Javobingiz: <span id="result">{myResult[index]}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
            <div id="question-ptoverka" className="">
              {/* Editor to the test ! */}
              <Editor
                height={"600px"}
                width={"100%"}
                language={lastLang}
                theme={"vs-dark"}
                value={getDefaultValueForLanguage(lastLang, question)}
                onClick={() => {
                  if (editorRef.current) {
                    editorRef.current.focus();
                  }
                }}
                onMount={onMount}
                onChange={(event) => setCode(event)}
              />
            </div>
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
        </div>
      </div>
    </>
  );
}

export default CompletePage;
