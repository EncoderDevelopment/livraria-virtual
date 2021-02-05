import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditAuthorComponent } from './author/add-edit/add-edit.component';
import { AuthorComponent } from './author/author.component';
import { AddEditBookComponent } from './book/add-edit/add-edit.component';
import { BookComponent } from './book/book.component';
import { VitrineComponent } from './vitrine/vitrine.component';

const routes: Routes = [
  { path: '', component: VitrineComponent },
  { path: 'vitrine', component: VitrineComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/add-book', component: AddEditBookComponent },
  { path: 'book/edit-book', component: AddEditBookComponent },
  { path: 'book/add-author', component: AddEditAuthorComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'author/add-author', component: AddEditAuthorComponent },
  { path: 'author/edit-author', component: AddEditAuthorComponent },
  { path: 'author/add-book', component: AddEditBookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
