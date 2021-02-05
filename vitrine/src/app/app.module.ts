import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { VitrineComponent } from './vitrine/vitrine.component';
import { BookComponent } from './book/book.component';
import { AddEditBookComponent } from './book/add-edit/add-edit.component';
import { AddEditAuthorComponent } from './author/add-edit/add-edit.component';
import { AuthorComponent } from './author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    VitrineComponent,
    BookComponent,
    AddEditBookComponent,
    AddEditAuthorComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    AppRoutingModule,    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
