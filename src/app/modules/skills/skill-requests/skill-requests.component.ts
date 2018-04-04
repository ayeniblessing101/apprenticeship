import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { TableHeaderSorterHelper } from '../../../helpers/table-header-sorter.helper';
import { SkillService } from '../../../services/skill.service';
import { RequestStatusPipe } from '../../../pipes/requests-status.pipe';
import requests from '../../../mocks/requests';
@Component({
  selector: 'app-skill-requests',
  templateUrl: './skill-requests.component.html',
  styleUrls: ['./skill-requests.component.scss'],
  providers: [RequestStatusPipe],
})
export class SkillRequestsComponent implements OnInit {
  @Input() skillId: number;
  @Input() skillName: string;
  skillRequests = [];
  loadingRequests = false;
  activeSortCategory = null;
  rerender: boolean;
  sortCategoryValues = {
    createdBy: 'asc',
    duration: 'asc',
    location: 'asc',
    status: 'asc',
    sessionCount: 'asc',
    dateAdded: 'asc',
  };

  constructor(
    private sortingHelper: SortingHelper,
    private changeDetector: ChangeDetectorRef,
    private tableHeaderSorterHelper: TableHeaderSorterHelper,
    private skillService: SkillService,
    private requestStatusPipe: RequestStatusPipe,
  ) {}

  ngOnInit() {
    this.loadingRequests = true;
    this.skillService.getSkillRequests(this.skillId)
      .toPromise()
      .then((response) => {
        this.skillRequests = response.requests;
        this.skillName = response.skillName;
        this.loadingRequests = false;
      })
      .catch((error) => {
        this.loadingRequests = false;
      });
  }

/**
  * Exports requests for a skill as CSV
  *
  * @return {void}
  */
  exportSkillRequestsToCSV () {
    const generatedCSV = new Blob(
      [this.convertSkillRequestsToCSV(this.skillRequests)], { type:
        'text/csv' });
    const csvFileURL = URL.createObjectURL(generatedCSV);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvFileURL;
    downloadLink.download = `Requests for ${this.skillName} skill as at ${moment().format('MMMM Do YYYY')}.csv`;
    downloadLink.click();
  }

/**
  * Converts an array of requests for a skill to CSV format
  *
  * @param {array} SkillRequests - Array of requests to be converted to CSV format
  *
  * @return {string} CSV string
  */
  convertSkillRequestsToCSV(skillRequests) {
    let csvFormattedSkillRequests = '';
    const delimeter = '\r\n';
    csvFormattedSkillRequests = csvFormattedSkillRequests.concat(
      `Created By, Date Added, Duration, Location, Number of Sessions, Status${delimeter}`)

    if (skillRequests.length > 0) {
      for (const request of skillRequests) {
        const {
          createdBy,
          location,
          sessionCount,
          duration,
          dateAdded,
          status } = request;
        const requestStatus = this.requestStatusPipe.transform(status);
        csvFormattedSkillRequests = csvFormattedSkillRequests.concat(
          `${createdBy}, ${dateAdded}, ${duration}, ${location}, ${sessionCount},${requestStatus}${delimeter}`);
      };
    }
    return csvFormattedSkillRequests;
  }

/**
 * Sorts history requests based on the table header
 *
 * @param {string} headerName - Name of the table column header
 * @param {boolean} headerIsDateType - whether the header is of type date or not
 *
 * @return {void}
 */
  sortTableHeader(headerName,  headerIsDateType = false) {
    this.tableHeaderSorterHelper.sortTableWithHeader(
      headerName,
      headerIsDateType,
      this.activeSortCategory,
      this.sortCategoryValues,
      this.skillRequests,
      this.sortingHelper.sortRequestsByHeader,
    )

    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }
}
