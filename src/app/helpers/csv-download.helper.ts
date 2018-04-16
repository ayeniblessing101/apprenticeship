export class CSVDownloadHelper {

  /**
   * Helper method that converts requests to csv format
   *
   * @param {array} records - the records to convert to csv format
   * @param {array} headers - used to create the csv headers
   * @param {string} fileName - desired filename for the csv file
   *
   * @return {void}
   */
  downloadCSV(records, headers, fileName) {
    let csvFormattedFile = '';
    const newLine = '\r\n';
    const commaSeparator = ',';
    const numberOfHeaderElements = headers.length;
    let tracker = 0;

    for (const header of headers) {
      csvFormattedFile += `${header.displayName}${commaSeparator}`;
    }
    csvFormattedFile += newLine;
    for (const record of records) {
      for (const header of headers) {
        if (typeof record[header.key] === 'number') {
          record[header.key] = `"${record[header.key]}"`;
        }

        if (record[header.key].indexOf(',') !== -1) {
          record[header.key] = `"${record[header.key]}"`;
        }
        csvFormattedFile += `${record[header.key]}${commaSeparator}`;
        tracker += 1;
        if (tracker === numberOfHeaderElements) {
          csvFormattedFile += newLine;
          tracker = 0;
        }
      }
    }

    const newCSV = new Blob(
      [csvFormattedFile], { type: 'text/csv' });
    const csvFileURL = URL.createObjectURL(newCSV);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvFileURL;
    downloadLink.download = `${fileName}.csv`;
    downloadLink.click();
  }
}

