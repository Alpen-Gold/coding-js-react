import  { useEffect, useState } from "react";
import "./admin.css";
import { LuArrowUpDown } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
import { FaRegMoon } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import CardQuestion from "./components/Card-Question";

const Leyout = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isGridActive, setIsGridActive] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLightMode);
    document.documentElement.classList.toggle("dark", !isLightMode);
  }, [isLightMode]);

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  const switchToGrid = () => {
    setIsGridActive(true);
  };

  const switchToList = () => {
    setIsGridActive(false);
  };

  const toggleMode = () => {
    setIsLightMode(!isLightMode);
  };

  return (
    <div className={`app-container`}>
      <div className="sidebar  ">
        <div className="sidebar-header ">
          <div className="app-icon mode-switch">Logo</div>
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <a
              href="#"
              className={`mode-switch ${isLightMode ? "active" : ""}`}
            >
              <span>Home</span>
            </a>
          </li>
          <li className="sidebar-list-item active">
            <a
              href="#"
              className={`mode-switch ${isLightMode ? "active" : ""}`}
            >
              <span>Products</span>
            </a>
          </li>
        </ul>
        <div className="account-info">
          <div className="account-info-picture">
            <img
              src="https://images.unsplash.com/photo-1527736947477-2790e28f3443?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHx3b21hbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="Account"
            />
          </div>
          <div className="account-info-name">Monica G.</div>
          <button className="account-info-more">
            <HiDotsVertical />
          </button>
        </div>
      </div>
      <div className="app-content ">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Products</h1>

          <div className="d-flex align-items-center gap-[32px]">
            <button
              className={`mode-switch bg-transparent border-none mt-[-20px] fs-5 ${
                isLightMode ? "active" : ""
              }`}
              onClick={toggleMode}
            >
              <FaRegMoon />
            </button>
            <button className="app-content-headerButton">Add Product</button>
          </div>
        </div>
        <div className="app-content-actions">
          <input className="search-bar" placeholder="Search..." type="text" />
          <div className="app-content-actions-wrapper">
            <div className="filter-button-wrapper">
              <button className="action-button filter" onClick={toggleFilter}>
                <span>Filter</span>
                <FiFilter />
              </button>
              <div className={`filter-menu ${isFilterActive ? "active" : ""}`}>
                <label>Category</label>
                <select>
                  <option>All Categories</option>
                  <option>Furniture</option>
                  <option>Decoration</option>
                  <option>Kitchen</option>
                  <option>Bathroom</option>
                </select>
                <label>Status</label>
                <select>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
                <div className="filter-menu-buttons">
                  <button className="filter-button reset">Reset</button>
                  <button className="filter-button apply">Apply</button>
                </div>
              </div>
            </div>
            <button
              className={`action-button list ${!isGridActive ? "active" : ""}`}
              onClick={switchToList}
            >
              List View
            </button>
            <button
              className={`action-button grid ${isGridActive ? "active" : ""}`}
              onClick={switchToGrid}
            >
              Grid View
            </button>
          </div>
        </div>
        <div
          className={`products-area-wrapper ${
            isGridActive ? "gridView" : "tableView"
          }`}
        >
          <div className="products-header">
            <div className="product-cell image">
              Items
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
            <div className="product-cell category">
              Category
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
            <div className="product-cell status-cell">
              Status
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
            <div className="product-cell sales">
              Sales
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
            <div className="product-cell stock">
              Stock
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
            <div className="product-cell price">
              Price
              <button className="sort-button">
                <LuArrowUpDown />
              </button>
            </div>
          </div>

          <CardQuestion />
        </div>
      </div>
    </div>
  );
};

export default Leyout;
