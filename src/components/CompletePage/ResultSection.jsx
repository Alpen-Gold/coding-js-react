const ResultSection = ({ question, myResult }) => {
  return (
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
  );
};

export default ResultSection;
