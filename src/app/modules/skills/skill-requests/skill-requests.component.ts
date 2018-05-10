import { Component, Input, Output, ChangeDetectorRef, OnInit, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { SkillService } from '../../../services/skill.service';
import { RequestStatusPipe } from '../../../pipes/requests-status.pipe';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { CSVHeader } from '../../../interfaces/csv-header.interface';

@Component({
  selector: 'app-skill-requests',
  templateUrl: './skill-requests.component.html',
  styleUrls: ['./skill-requests.component.scss'],
  providers: [RequestStatusPipe, RequestDurationPipe, DatePipe],
})
export class SkillRequestsComponent implements OnInit {
  @Input() skillId: number;
  @Input() skillName: string;

  @Output() toggleViewAllMentors = new EventEmitter();

  skillRequests = [];
  loadingRequests = false;
  activeSortCategory = null;
  rerender: boolean;
  sortCategoryValues = {
    created_by_name: 'asc',
    duration: 'asc',
    location: 'asc',
    status_id: 'asc',
    session_count: 'asc',
    created_at: 'asc',
  };

  constructor(
    private changeDetector: ChangeDetectorRef,
    private tableHeaderSorterHelper: TableHeaderSortHelper,
    private skillService: SkillService,
    private requestStatusPipe: RequestStatusPipe,
    private requestDurationPipe: RequestDurationPipe,
    private csvDownloadHelper: CSVDownloadHelper,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.getSkillRequests();
  }

  /**
   * Get skill requests
   *
   * @return {void}
   */
  getSkillRequests() {
    this.loadingRequests = true;
    this.skillService.getSkillRequests(this.skillId)
      .toPromise()
      .then((response) => {
        this.skillName = response.skill.name;
        this.skillRequests = response.skill.requests.map((request) => {
          request.created_by_name = request.created_by.fullname;
          return request;
        });
        this.loadingRequests = false;
        this.toggleViewAllMentors.emit(this.skillRequests.length);
      })
      .catch(() => {
        this.loadingRequests = false;
      });
  }

  /**
   * Exports requests for a skill as CSV
   *
   * @return {void}
   */
  exportSkillRequestsToCSV() {
    const fileName = `Requests for ${this.skillName} as at ${moment().format('MMM Do YYYY')}`;
    const headers: CSVHeader[] = [
      { key: 'created_by_name', displayName: 'Created By' },
      { key: 'created_at', displayName: 'Date Added' },
      { key: 'duration', displayName: 'Duration' },
      { key: 'location', displayName: 'Location' },
      { key: 'session_count', displayName: 'Number of Sessions' },
      { key: 'status_id', displayName: 'Status' },
    ];

    const transformedRecords = this.skillRequests.map((request) => {
      const transformedRequest = { ...request };
      transformedRequest.duration = this.requestDurationPipe.transform(transformedRequest.duration);
      transformedRequest.status = this.requestStatusPipe.transform(transformedRequest.status);
      transformedRequest.dateAdded = this.datePipe.transform(transformedRequest.dateAdded, 'longDate');
      return transformedRequest;
    });

    this.csvDownloadHelper.downloadCSV(transformedRecords, headers, fileName);
  }

/**
 * Sorts history requests based on the table header
 *
 * @param {string} headerName - Name of the table column header
 * @param {boolean} headerIsDateType - whether the header is of type date or not
 *
 * @return {void}
 */
  sortSkillRequestsByHeader(headerName,  headerIsDateType = false) {
    this.tableHeaderSorterHelper.sortTableWithHeader(
      headerName,
      headerIsDateType,
      this.skillRequests,
      this.activeSortCategory,
      this.sortCategoryValues,
    );
    this.activeSortCategory = headerName;
    this.rerender = true;
    this.changeDetector.detectChanges();
    this.rerender = false;
  }
}
