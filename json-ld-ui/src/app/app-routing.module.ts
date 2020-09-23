import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadbolComponent } from './uploadbol/uploadbol.component';


const routes: Routes = [
  { path: '', component: UploadbolComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
