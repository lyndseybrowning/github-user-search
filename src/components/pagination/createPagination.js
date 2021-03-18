function createPagination({ totalPages, currentPage, range }) {
    const pageRange = Math.floor(range / 2);
    const firstPageInRange = Math.abs(currentPage - pageRange);
    const firstPage = firstPageInRange === 0 ? 1 : firstPageInRange;

    const lastPageInRange = firstPage + range - 1;
    const firstPageOutOfRange = Math.abs(totalPages - range + 1);

    const startPage =
        firstPage + range > totalPages ? firstPageOutOfRange : firstPage;
    const endPage = lastPageInRange > totalPages ? totalPages : lastPageInRange;
    const pages = [];

    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
        pages.push(pageNumber);
    }

    return pages;
}

export default createPagination;
