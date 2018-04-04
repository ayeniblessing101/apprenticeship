import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsPageComponent } from './skills-page/skills-page.component';
import { AuthGuard } from '../../services/auth-guard.service';
import { AdminGuard } from '../../services/admin-guard.service';
import { SkillDetailsPageComponent } from './skill-details-page/skill-details-page.component';

const routes: Routes = [
  { path: '',
    component: SkillsPageComponent,
  },

  { path: ':id',
    component: SkillDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class SkillsRoutesModule {}
