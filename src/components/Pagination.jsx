function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center gap-2 py-4 flex-wrap">
      {/* Previous Button */}
      <PaginationButton
        label="Prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
      />

      {/* Page Info */}
      <span className="text-xs sm:text-sm px-2 py-1 font-medium text-white">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <PaginationButton
        label="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      />
    </div>
  );
}

// Reusable PaginationButton component
function PaginationButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-gray-300 text-black rounded disabled:opacity-50 w-16 sm:w-auto"
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default Pagination;
