import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeQuestions from "./pages/HomeQuestions";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AllPages from "./pages/AllPages";
import QuestionPage from "./pages/QuestionPage";
import CompletePage from "./pages/CompletePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AllPages />}>
        <Route index element={<HomeQuestions />}></Route>
        <Route path=":questionId" element={<QuestionPage />}></Route>
        <Route
          path=":questionId/:completeQuestion"
          element={<CompletePage />}
        ></Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
