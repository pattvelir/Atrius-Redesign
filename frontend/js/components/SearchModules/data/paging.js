/**
 * @module search/paging
 */

/**
 * @typedef {Object} PageShape
 * @property {number} num The page number
 * @property {string} label Display name for page
 * @property {boolean} current True if page is the current page
 */

import * as R from "ramda";

// number of page to show before and after current page
// if at first or last page, double the number will be shown
// either after or before
const PAGE_BLOCK_RANGE = 3;

/**
 * Get a count total pages in the current result set.
 * @param {Number} totalResults
 * @param {Number} resultsPerPage
 * @returns {Number} total number of pages
 */
export function totalPages(totalResults, resultsPerPage) {
  return Math.ceil(totalResults / resultsPerPage);
}

/**
 * Is this page the last?
 * @param {number} totalResults
 * @param {number} resultsPerPage
 * @param {number} currentPage
 * @returns {boolean}
 */
export function isLastPage(totalResults, resultsPerPage, currentPage) {
  const numPages = totalPages(totalResults, resultsPerPage);
  return currentPage >= numPages;
}

/**
 * Is this page the first?
 * @param {number} currentPage
 * @returns {boolean}
 */
export function isFirstPage(currentPage) {
  return currentPage === 1;
}

// returns a block of page numbers appropriately
// adjacent to the currently selected page
/**
 * A block of page numbers appropriately adjacent to the currently selected page
 * @param {number} totalResults
 * @param {number} resultsPerPage
 * @param {number} currentPage
 * @returns {Array<PageShape>}
 */
export function pageBlock(totalResults, resultsPerPage, currentPage) {
  const numPages = totalPages(totalResults, resultsPerPage);
  const numPagesVisible = Math.min(numPages, PAGE_BLOCK_RANGE * 2 + 1);
  let start = Math.max(1, currentPage - PAGE_BLOCK_RANGE);

  if (currentPage + PAGE_BLOCK_RANGE > numPages) {
    // (desired page range) - (Size of current page range)
    start -= numPagesVisible - (numPages - (start - 1));
  }

  const pages = R.range(start, start + numPagesVisible);

  return R.map((page) => {
    return {
      num: page,
      label: page,
      current: page == currentPage,
    };
  }, pages);
}

/**
 * This retruns the function from the prop handlePageChange.
 *
 * @param {number} pageNum
 * @param {number} isDisabled
 * @param {function} handlePageChange
 */
export const onPageClick = (pageNum, isDisabled, handlePageChange) => {
  if (!isDisabled) {
    handlePageChange(pageNum);
  }
};
