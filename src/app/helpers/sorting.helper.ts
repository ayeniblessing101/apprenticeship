import * as moment from 'moment';

export class SortingHelper {

  /**
   * Helper method that sorts requests based on the provided header.
   *
   * @param requests - the requests to sort
   * @param {String} headerName - the header name to sort the requests by
   * @param {Boolean} headerIsDateType - determines whether header is of type date
   * @param {String} sortingOrder - determines the order in which the request should be sorted.
   * asc for ascending order and desc for descending order
   *
   * @return {object} requests - the sorted requests
   */
  sortRequestsByHeader(requests, headerName, headerIsDateType = false, sortingOrder = 'asc') {
    if (sortingOrder === 'desc') {
      if (headerIsDateType) {
        requests.sort((currentRequest, nextRequest) => {
          const currentRequestColumnValue = moment(currentRequest[headerName]);
          const nextRequestColumnValue = moment(nextRequest[headerName]);

          if (currentRequestColumnValue.isAfter(nextRequestColumnValue)) {
            return -1;
          }
          if (currentRequestColumnValue.isBefore(nextRequestColumnValue)) {
            return 1;
          }

          return 0;
        });
      } else {
        requests.sort((currentRequest, nextRequest) => {
          const currentRequestColumnValue = typeof currentRequest[headerName] === 'string' ?
            currentRequest[headerName].toLowerCase() : currentRequest[headerName];
          const nextRequestColumnValue = typeof nextRequest[headerName] === 'string' ?
            nextRequest[headerName].toLowerCase() : nextRequest[headerName];

          if (currentRequestColumnValue > nextRequestColumnValue) {
            return -1;
          }
          if (currentRequestColumnValue < nextRequestColumnValue) {
            return 1;
          }

          return 0;
        });
      }

      return requests;
    }

    if (headerIsDateType) {
      requests.sort((currentRequest, nextRequest) => {
        const currentRequestColumnValue = moment(currentRequest[headerName]);
        const nextRequestColumnValue = moment(nextRequest[headerName]);

        if (currentRequestColumnValue.isAfter(nextRequestColumnValue)) {
          return 1;
        }
        if (currentRequestColumnValue.isBefore(nextRequestColumnValue)) {
          return -1;
        }

        return 0;
      });
    } else {
      requests.sort((currentRequest, nextRequest) => {
        const currentRequestColumnValue = typeof currentRequest[headerName] === 'string' ?
          currentRequest[headerName].toLowerCase() : currentRequest[headerName];
        const nextRequestColumnValue = typeof nextRequest[headerName] === 'string' ?
          nextRequest[headerName].toLowerCase() : nextRequest[headerName];

        if (currentRequestColumnValue > nextRequestColumnValue) {
          return 1;
        }
        if (currentRequestColumnValue < nextRequestColumnValue) {
          return -1;
        }

        return 0;
      });
    }

    return requests;
  }
}
