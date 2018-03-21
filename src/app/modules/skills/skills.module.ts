import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SkillRecordsComponent } from './skill-records/skill-records.component';
import { SkillsPageComponent } from './skills-page/skills-page.component'
import { AddSkillModalComponent } from './add-skill-modal/add-skill-modal.component';
import { RequestPoolModule } from '../request-pool/request-pool.module';
import { SkillsRoutesModule } from './skills.routes.module';

@NgModule({
  imports: [
    SkillsRoutesModule,
    CommonModule,
    FormsModule,
    RequestPoolModule,
  ],
  declarations: [
    SkillRecordsComponent,
    SkillsPageComponent,
    AddSkillModalComponent,
  ],
})
export class SkillsModule { }
