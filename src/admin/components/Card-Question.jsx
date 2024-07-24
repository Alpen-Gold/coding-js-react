import { HiDotsVertical } from "react-icons/hi";

const CardQuestion = () => {
  return (
    <>
      <div className="products-row">
        <button className="cell-more-button">
          <HiDotsVertical />
        </button>
        <div className="product-cell image">
          <img
            src="https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGludGVyaW9yfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
            alt="product"
          />
          <span>Sand</span>
        </div>
        <div className="product-cell category">
          <span className="cell-label">Category:</span>Living Room
        </div>
        <div className="product-cell status-cell">
          <span className="cell-label">Status:</span>
          <span className="status disabled">Disabled</span>
        </div>
        <div className="product-cell sales">
          <span className="cell-label">Sales:</span>52
        </div>
        <div className="product-cell stock">
          <span className="cell-label">Stock:</span>16
        </div>
        <div className="product-cell price">
          <span className="cell-label">Price:</span>$230
        </div>
      </div>

      <div className="products-row">
        <button className="cell-more-button">
          <HiDotsVertical />
        </button>
        <div className="product-cell image">
          <img
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW50ZXJpb3J8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
            alt="product"
          />
          <span>Boheme</span>
        </div>
        <div className="product-cell category">
          <span className="cell-label">Category:</span>Furniture
        </div>
        <div className="product-cell status-cell">
          <span className="cell-label">Status:</span>
          <span className="status active">Active</span>
        </div>
        <div className="product-cell sales">
          <span className="cell-label">Sales:</span>32
        </div>
        <div className="product-cell stock">
          <span className="cell-label">Stock:</span>40
        </div>
        <div className="product-cell price">
          <span className="cell-label">Price:</span>$350
        </div>
      </div>
    </>
  );
};

export default CardQuestion;
