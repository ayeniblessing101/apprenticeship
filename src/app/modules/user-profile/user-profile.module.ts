import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { UserProfileRoutesModule } from './user-profile-routes.module';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkillService } from '../../services/skill.service';
import { StarRatingModule } from 'angular-star-rating';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    Ng2AutoCompleteModule,
  ],
  providers: [
    SkillService,
  ],
  declarations: [ProfilePageComponent, UserStatsComponent, UserSkillsComponent]
})
export class UserProfileModule { }
