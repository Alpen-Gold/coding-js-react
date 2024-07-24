import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { handleEditorColor } from "../store/slices/SliceDatas";

function AllPages() {
  const [isLightMode, setIsLightMode] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.classList.toggle("light", isLightMode);
    document.documentElement.classList.toggle("dark", !isLightMode);
  }, [isLightMode]);

  const toggleMode = () => {
    setIsLightMode(!isLightMode);
    dispatch(handleEditorColor(isLightMode));
  };
  return (
    <>
      <div className="container px-4" id="home">
        <div id="container">
          <header className="pt-4 d-flex  align-items-center justify-between">
            <div>
              <h1 className="cursor">masala.js</h1>
              <p className="text-secondary" id="subtitle">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
              </p>
            </div>
            <button
              className={`mode-switch bg-transparent border-none mb-[50px] me-4 fs-5 ${
                isLightMode ? "active" : ""
              }`}
              onClick={toggleMode}
            >
              <FaRegMoon />
            </button>
          </header>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AllPages;
