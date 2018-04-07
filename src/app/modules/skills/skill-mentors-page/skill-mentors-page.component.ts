import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
   * Converts an array of mentors to csv formart
   *
   * @param {array} mentors an array of mentors
   *
   * @return {string} CSV string
   */
  convertMentorsToCsv(mentors) {
    const lineDelimiter = '\r\n';
    let mentorDetailsInCsvFormat = '';
    mentorDetailsInCsvFormat = mentorDetailsInCsvFormat.concat(
      `Mentor,No. Of Mentorships,Rating,Last Active${lineDelimiter}`,
    );

    if (mentors.length > 0) {
      for (const mentor of mentors) {
        const mentorName = mentor.name;
        const noOfMentorships = mentor.mentorships_count;
        const rating = mentor.average_rating;
        const lastActive = mentor.last_active;

        mentorDetailsInCsvFormat = mentorDetailsInCsvFormat.concat(
          `${mentorName},${noOfMentorships},${rating},"${lastActive}"${lineDelimiter}`,
        );
      }
    }

    return mentorDetailsInCsvFormat;
  }

  /**
   * Export mentors in a csv file format
   *
   * @returns {void}
   */
  exportMentorsToCsv() {
    const csvGenerated = new Blob(
      [this.convertMentorsToCsv(this.mentors)],
      { type: 'text/csv' },
    )
    const csvFileURL = URL.createObjectURL(csvGenerated);
    const downloadLink = document.createElement('a');
    const currentDate = new Date();
    downloadLink.href = csvFileURL;
    downloadLink.download = `${this.skill} mentors - ${currentDate.toJSON().slice(0, 10).replace(/-/g, '_')}`;
    downloadLink.click();
  }
}
