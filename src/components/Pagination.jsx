function Pagination({ currentPage, totalPages, onPageChange }) {
  // Go to previous page
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Go to next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 my-6">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Current Page Info */}
      <span className="px-4 py-1 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
