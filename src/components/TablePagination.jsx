import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="page-btns">
      <button
        className="btn"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span style={{ margin: "auto 10px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="btn"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
