import React, { useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { getQuestions } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function QuestionPage() {
  const { localCheked, allQuestions, loading, error } = useSelector(
    (store) => store.allData
  );
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const navagate = useNavigate();

  useEffect(() => {
    getQuestions(dispatch, questionId, localCheked);
  }, [localCheked, dispatch, questionId]);

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
      <div className="row py-3 mt-3" id="setOfQuestions">
        {/* <div>
              <h1 className="question">Arrau-1</h1>

              <button className="set-box">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div> */}

        {allQuestions.map((item, index) => {
          const indexLobal = item.fun_name.indexOf(" ");
          return (
            <div
              className="col-md-6 col-lg-4 col-xl-3"
              key={item.id}
              onClick={() => navagate(`${item.id}`)}
            >
              <div className="set-box flex align-items-center justify-between">
                <p className="set-title mb-0">
                  {item.fun_name.slice(0, indexLobal)}
                </p>

                <div className=" mt-[-20px] me-[19px]">
                  {item.cheked && (
                    <FaCircleCheck className="fs-5 cheked-icon" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QuestionPage;
