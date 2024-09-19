import React from 'react';

/**
 * Pagination component
 *
 * Renders a pagination component with previous and next buttons
 *
 * @param {Number} page the current page number
 * @param {Number} pageSize the number of items to show per page
 * @param {Number} totalItems the total number of items
 * @param {Function} onPageChange callback to call when the page is changed
 */
const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      <button
        className='mr-2 px-2 py-1 border border-gray-300 text-white font-bold rounded cursor-pointer bg-red-600 '
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      <button
        className='ml-2 px-10 py-1 border border-gray-300 rounded cursor-pointer  bg-red-600 text-white font-bold '
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
