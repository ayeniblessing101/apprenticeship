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

import { RequestStatusPipe } from '../../pipes/requests-status.pipe';
@NgModule({
  imports: [
    SkillsRoutesModule,
    CommonModule,
    FormsModule,
    RequestPoolModule,
    SharedModule,
  ],
  declarations: [
    SkillRecordsComponent,
    SkillsPageComponent,
    AddSkillModalComponent,
    EditSkillModalComponent,
    SkillDetailsPageComponent,
    SkillRequestsComponent,
    SkillTopMentorsComponent,
    RequestStatusPipe,
  ],
})
export class SkillsModule { }
