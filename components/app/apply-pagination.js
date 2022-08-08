// TODO : refactor this to be global
export const applyPagination = (tabs, page, rowsPerPage) => tabs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
