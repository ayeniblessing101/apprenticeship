import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRequestsPageComponent } from './all-requests-page/all-requests-page.component';

const routes: Routes = [
  { path: '', component: AllRequestsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class AllRequestsRoutesModule {}
