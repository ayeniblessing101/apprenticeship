import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search/search-page.component';

const routes: Routes = [
  { path: '', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})

export class SearchRoutesModule {}
