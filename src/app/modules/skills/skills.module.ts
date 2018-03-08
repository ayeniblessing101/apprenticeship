import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRecordsComponent } from './skill-records/skill-records.component';
import { SkillsPageComponent } from './skills-page/skills-page.component'
import { RequestPoolModule } from '../request-pool/request-pool.module';
import { SkillsRoutesModule } from './skills.routes.module';

@NgModule({
  imports: [
    SkillsRoutesModule,
    CommonModule,
    RequestPoolModule,
  ],
  declarations: [
    SkillRecordsComponent,
    SkillsPageComponent,
  ],
})
export class SkillsModule { }
