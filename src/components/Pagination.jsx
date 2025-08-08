function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 py-4 flex-wrap">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50 w-16 sm:w-auto"
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="text-xs sm:text-sm px-2 py-1 font-medium text-white">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50 w-16 sm:w-auto"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
