import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkillRecordsComponent } from './skill-records/skill-records.component';
import { SkillsPageComponent } from './skills-page/skills-page.component'
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component';
import { SkillDetailsPageComponent } from '../skills/skill-details-page/skill-details-page.component';
import { RequestPoolModule } from '../request-pool/request-pool.module';
import { SkillsRoutesModule } from './skills.routes.module';
import { EditSkillModalComponent } from './edit-skill-modal/edit-skill-modal.component';
import { SkillTopMentorsComponent } from './skill-top-mentors/skill-top-mentors.component';
import { SkillRequestsComponent } from './skill-requests/skill-requests.component';
import { SharedModule } from '../shared/shared.module';
import { SkillMentorsPageComponent } from './skill-mentors-page/skill-mentors-page.component';
import { MentorRecordsComponent } from './mentor-records/mentor-records.component';
import { RequestStatusPipe } from '../../pipes/requests-status.pipe';
import { SkillMentorsResolver } from '../../resolvers/skill-mentors.resolver';

@NgModule({
  imports: [
    SkillsRoutesModule,
    CommonModule,
    FormsModule,
    RequestPoolModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    SkillRecordsComponent,
    SkillsPageComponent,
    SkillMentorsPageComponent,
    MentorRecordsComponent,
    AddSkillModalComponent,
    EditSkillModalComponent,
    SkillDetailsPageComponent,
    SkillRequestsComponent,
    SkillTopMentorsComponent,
    RequestStatusPipe,
  ],
  providers: [
    SkillMentorsResolver,
  ],
})
export class SkillsModule { }
