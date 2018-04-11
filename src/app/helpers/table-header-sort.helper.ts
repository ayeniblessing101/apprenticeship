import * as moment from 'moment';

export class TableHeaderSortHelper {
  /**
   * Helper method that sorts records based on the provided header.
   *
   * @param {String} headerName - the header name to sort the records by
   * @param {Boolean} headerIsDateType - determines whether header is of type date
   * @param {array} records - the records to sort
   * @param {String} activeSortCategory - the current sorting category
   * @param {Object} sortCategoryValues - object that contains table header and default sorting order
   *
   * @return {Object} records - the sorted records
   */
  sortTableWithHeader(
    headerName,
    headerIsDateType = false,
    records,
    activeSortCategory,
    sortCategoryValues,
  ) {
    if (activeSortCategory !== headerName && !this.checkRecordsHeaderHasValue(headerName, records)) {
      return;
    }

    let sortingOrder = sortCategoryValues[headerName];
    if (activeSortCategory === headerName) {
      sortingOrder = sortCategoryValues[headerName] === 'asc' ? 'desc' : 'asc';
    }
    this.sortRecordsUsingHeaders(
      records, headerName, headerIsDateType, sortingOrder,
    );
    sortCategoryValues[headerName] = sortingOrder;
  }

  /**
   * Checks whether the column of a record table header is not null
   *
   * @return {Boolean} - Result of whether the table header has column value or not
   */
  checkRecordsHeaderHasValue(headerName, records) {
    const headerValueIndex = records.findIndex((record) => {
      return !!record[headerName];
    });

    return headerValueIndex !== -1;
  }

  /**
   * Helper method that sorts records based on the provided header.
   *
   * @param records - the reords to sort
   * @param {String} headerName - the header name to sort the records by
   * @param {Boolean} headerIsDateType - determines whether header is of type date
   * @param {String} sortingOrder - determines the order in which the record should be sorted.
   * asc for ascending order and desc for descending order
   *
   * @return {object} records - the sorted records
   */
  sortRecordsUsingHeaders(records, headerName, headerIsDateType = false, sortingOrder = 'asc') {
    if (sortingOrder === 'desc') {
      if (headerIsDateType) {
        records.sort((currentrecord, nextrecord) => {
          const currentrecordColumnValue = moment(currentrecord[headerName]);
          const nextrecordColumnValue = moment(nextrecord[headerName]);

          if (currentrecordColumnValue.isAfter(nextrecordColumnValue)) {
            return -1;
          }
          if (currentrecordColumnValue.isBefore(nextrecordColumnValue)) {
            return 1;
          }

          return 0;
        });
      } else {
        records.sort((currentrecord, nextrecord) => {
          const currentrecordColumnValue = typeof currentrecord[headerName] === 'string' ?
            currentrecord[headerName].toLowerCase() : currentrecord[headerName];
          const nextrecordColumnValue = typeof nextrecord[headerName] === 'string' ?
            nextrecord[headerName].toLowerCase() : nextrecord[headerName];

          if (currentrecordColumnValue > nextrecordColumnValue) {
            return -1;
          }
          if (currentrecordColumnValue < nextrecordColumnValue) {
            return 1;
          }

          return 0;
        });
      }

      return records;
    }

    if (headerIsDateType) {
      records.sort((currentrecord, nextrecord) => {
        const currentrecordColumnValue = moment(currentrecord[headerName]);
        const nextrecordColumnValue = moment(nextrecord[headerName]);

        if (currentrecordColumnValue.isAfter(nextrecordColumnValue)) {
          return 1;
        }
        if (currentrecordColumnValue.isBefore(nextrecordColumnValue)) {
          return -1;
        }

        return 0;
      });
    } else {
      records.sort((currentrecord, nextrecord) => {
        const currentrecordColumnValue = typeof currentrecord[headerName] === 'string' ?
          currentrecord[headerName].toLowerCase() : currentrecord[headerName];
        const nextrecordColumnValue = typeof nextrecord[headerName] === 'string' ?
          nextrecord[headerName].toLowerCase() : nextrecord[headerName];

        if (currentrecordColumnValue > nextrecordColumnValue) {
          return 1;
        }
        if (currentrecordColumnValue < nextrecordColumnValue) {
          return -1;
        }

        return 0;
      });
    }

    return records;
  }
}
