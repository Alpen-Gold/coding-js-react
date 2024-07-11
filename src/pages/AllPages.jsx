import React from "react";
import { Outlet } from "react-router-dom";
import Confetti from "https://cdn.skypack.dev/react-confetti@6.0.0";

function AllPages() {
  return (
    <>
      <div className="container px-4" id="home">
        <div id="container">
          <header className="pt-4">
            <h1 className="cursor">masala.js</h1>
            <p className="text-secondary" id="subtitle">
              JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
          </header>

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AllPages;
