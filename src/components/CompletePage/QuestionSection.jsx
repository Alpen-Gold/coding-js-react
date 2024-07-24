import { FaArrowLeft, FaCircleCheck, FaHouse } from "react-icons/fa6";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";

const QuestionSection = ({
  question,
  fullEkran,
  onFullscreenToggle,
  onPrevious,
  onNext,
  navigate,
  questionId,
  nextPre,
  allQuestions,
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
          className="home btn py-3 next-question d-flex justify-center align-items-center"
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
          className={`left-exit btn next-question d-flex justify-center align-items-center ${
            nextPre > 0 ? "" : "d-none"
          }`}
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className={`left-exit btn next-question d-flex justify-center align-items-center ${
            nextPre + 1 < allQuestions.length ? "" : "d-none"
          }`}
          onClick={onNext}
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
    </div>
  );
};

export default QuestionSection;
