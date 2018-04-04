
export class TableHeaderSorterHelper {
  /**
   * Helper method that sorts requests based on the provided header.
   *
   * @param requests - the requests to sort
   * @param {String} headerName - the header name to sort the requests by
   * @param {Boolean} headerIsDateType - determines whether header is of type date
   * @param {String} sortingOrder - determines the order in which the request should be sorted
   * @param {String} activeSortCategory - the current sorting category
   * @param {Object} sortCategoryValues - object that contains table header and default sorting order
   * @param {Method} sortingHelper - helper function that performs the actual sorting
   *
   * @return {Object} requests - the sorted requests
   */
  sortTableWithHeader(
      headerName,
      headerIsDateType = false,
      activeSortCategory,
      sortCategoryValues,
      requests,
      sortingHelper,
  ) {
    if (activeSortCategory !== headerName && !this.checkRequestHeaderHasValue(headerName, requests)) {
      return;
    }

    let sortingOrder = sortCategoryValues[headerName];
    if (activeSortCategory === headerName) {
      sortingOrder = sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }
    sortingHelper(
      requests, headerName, headerIsDateType, sortingOrder,
    );
    sortCategoryValues[headerName] = sortingOrder;
  }

  /**
   * Checks whether the column of a request table header is not null
   *
   * @return {Boolean} - Result of whether the table header has column value or not
   */
  checkRequestHeaderHasValue(headerName, requests) {
    const headerValueIndex = requests.findIndex((request) => {
      return !!request[headerName];
    });

    return headerValueIndex !== -1;
  }
}
