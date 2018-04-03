import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SkillRecordsComponent } from './skill-records/skill-records.component';
import { SkillsPageComponent } from './skills-page/skills-page.component'
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component';
import { RequestPoolModule } from '../request-pool/request-pool.module';
import { SkillsRoutesModule } from './skills.routes.module';
import { EditSkillModalComponent } from './edit-skill-modal/edit-skill-modal.component';

@NgModule({
  imports: [
    SkillsRoutesModule,
    CommonModule,
    FormsModule,
    RequestPoolModule,
    FormsModule,
  ],
  declarations: [
    SkillRecordsComponent,
    SkillsPageComponent,
    AddSkillModalComponent,
    EditSkillModalComponent,
  ],
})
export class SkillsModule { }
