import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
// Services
import { JsonldService } from './services';
// Directives
import { DragDropDirective } from './directives/drag-drop.directive';
// Components
import { UploadbolComponent } from './uploadbol/uploadbol.component';
import { DocumentViewComponent } from './document-view/documentview.component';
import { ChargesComponent } from './charges/charges.component';
import { CargoListComponent } from './cargo-list/cargo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentViewComponent,
    ChargesComponent,
    UploadbolComponent,
    CargoListComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [JsonldService],
  bootstrap: [AppComponent]
})
export class AppModule { }
