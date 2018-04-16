import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';
import { CSVHeader } from '../../../interfaces/csv-header.interface';
@Component({
  selector: 'app-skill-mentors-page',
  templateUrl: './skill-mentors-page.component.html',
  styleUrls: ['./skill-mentors-page.component.scss'],
})
export class SkillMentorsPageComponent {
  skill: any;
  mentors: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private csvDownloadHelper: CSVDownloadHelper,
  ) {
    route.data.subscribe((value) => {
      this.mentors = value.skillMentors.mentors;
      this.skill = value.skillMentors.skillName;
    });
  }

  /**
   * Method to take admins to the previous page they were in
   *
   * @return {void}
   */
  goToPreviousPage() {
    this.location.back();
  }

  /**
   * Export mentors in a csv file format
   *
   * @returns {void}
   */
  exportMentorsToCsv() {
    const currentDate = new Date();
    const fileName = `${this.skill} mentors - ${currentDate.toJSON().slice(0, 10).replace(/-/g, '_')}`;
    const headers: CSVHeader[] = [
      { key: 'name', displayName: 'Mentor' },
      { key: 'mentorships_count', displayName: 'No. Of Mentorships' },
      { key: 'rating', displayName: 'Rating' },
      { key: 'last_active', displayName: 'Last Active' },
    ];

    const records = this.mentors.map((mentor) => {
      const currentMentor = { ...mentor };
      currentMentor.rating = `${currentMentor.average_rating}/5`;
      return currentMentor;
    });

    this.csvDownloadHelper.downloadCSV(records, headers, fileName);
  }
}
