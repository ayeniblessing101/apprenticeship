import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { SkillDetailsPageComponent } from './skill-details-page/skill-details-page.component';
import { SkillMentorsPageComponent } from './skill-mentors-page/skill-mentors-page.component';
import { SkillMentorsResolver } from '../../resolvers/skill-mentors.resolver';

const routes: Routes = [
  { path: '',
    component: SkillsPageComponent,
  },

  { path: ':id',
    component: SkillDetailsPageComponent,
  },
  {
    path: ':id/mentors',
    component: SkillMentorsPageComponent,
    resolve: {
      skillMentors: SkillMentorsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class SkillsRoutesModule {}
