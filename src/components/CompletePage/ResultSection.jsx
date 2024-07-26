import { FaArrowLeft, FaCircleCheck, FaHouse } from "react-icons/fa6";

const ResultSection = ({
  fullEkran,
  navigate,
  questionId,
  nextPre,
  allQuestions,
  pogination,
  question,
  myResult,
}) => {
  return (
    <div
      className={`card-question col-12 col-lg-12 text-center text-xl-start ${
        fullEkran
          ? "col-xl-12 justify-center align-items-center flex-col d-flex"
          : "col-xl-6"
      }`}
    >
      <div className="btns d-flex gap-2">
        <button
          className="home btn py-3  next-question d-flex justify-center align-items-center"
          onClick={() => navigate("/")}
        >
          <FaHouse />
        </button>

        <button
          className={`left-exit btn py-3 next-question d-flex justify-center align-items-center`}
          onClick={() => navigate(`/${questionId}`)}
        >
          <FaArrowLeft />
        </button>
        <button
          className={`left-exit btn  next-question d-flex justify-center align-items-center ${
            nextPre > 0 ? "" : "d-none"
          }`}
          onClick={() => pogination("previous")}
        >
          Previous
        </button>

        <button
          className={`left-exit btn next-question d-flex justify-center align-items-center ${
            nextPre + 1 < allQuestions.length ? "" : "d-none"
          }`}
          onClick={() => pogination("next")}
        >
          Next
        </button>
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
  );
};

export default ResultSection;
