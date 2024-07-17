import React, { useEffect } from "react";
import { FaHourglassStart } from "react-icons/fa";
import { getHomeQuestions, getQuestionsForProsent } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function HomeQuestions() {
  const { homeQuestions, error, loading, localCheked, questionsForProtsent } =
    useSelector((store) => store.allData);

  const dispatch = useDispatch();

  useEffect(() => {
    getHomeQuestions(dispatch);
    getQuestionsForProsent(dispatch, localCheked);
  }, []);

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

        {homeQuestions.map((item, index) => {
          const questionSize = questionsForProtsent.filter(
            (n) => n.category_id === item.id
          );

          const protsent = Math.trunc(
            (questionSize.filter((n) => n.cheked).length * 100) /
              questionSize.length
          );

          return (
            <NavLink
              to={`/${item.id}`}
              className="col-md-6 col-lg-4 col-xl-3"
              key={item.id}
            >
              <div className="set-box">
                <p className="set-title mb-0">{item.title}</p>
                <div className="d-flex justify-content-between">
                  <div className=" d-flex align-items-end w-100 gap-2">
                    <div>
                      <p className="p-0 m-0">{questionSize?.length}</p>
                    </div>
                    <div>
                      <FaHourglassStart
                        className="text-gold"
                        style={{ marginTop: "-20px" }}
                      />
                    </div>
                  </div>
                  <div className="skill">
                    <div className="outer">
                      <div className="inner">
                        <div id="percent1">{protsent || 0}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </>
  );
}

export default HomeQuestions;
