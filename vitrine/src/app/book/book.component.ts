import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { AuthorServiceService } from '../service/author-service.service';
import { BookServiceService } from '../service/book-service.service';
import { BookSonsumerApiService } from '../service/book-sonsumer-api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  title = 'books';
  position = { positionClass:'toast-bottom-right' };
  books: any;
  resourcesLoaded = false;
  checkedBook = false;
  checkedAuthor = false;
  params: any = {};
  filterData: FormGroup;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private apiService: BookSonsumerApiService,
    private bookService: BookServiceService, 
    private authorService: AuthorServiceService, 
    private toastr: ToastrService) { }

  //habilita a ordenação por livro
  toggleBooks(completed: boolean) {
    this.checkedBook = completed;
    this.findPage();
  }

  //habilita a ordenação por autor
  toggleAuthor(completed: boolean) {
    this.checkedAuthor = completed;
    this.findPage();
  }

  ngOnInit(): void {
    this.filterData = new FormGroup({ search: new FormControl(null) });
    this.findPage();
    this.findLikeBook();
  }

  //busca com recurso de paginação
  private findPage() {
    this.resourcesLoaded = true;
    this.apiService.findPage(this.checkedAuthor, this.checkedBook, this.pageEvent ? this.pageEvent.pageSize : 10, this.pageEvent ? this.pageEvent.pageIndex : 0).subscribe((result: any) => {
      this.books = result.content;
      this.length = result.totalElements;
      this.resourcesLoaded = false;

    }, (error: any) => {
      this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
      this.resourcesLoaded = false;
    });
  }

  //busca com recurso de like pelo titulo
  findLikeBook() {
    this.resourcesLoaded = true;
    this.filterData.valueChanges
      .pipe(debounceTime(400))
      .subscribe((search: any) => {
        if (search.search && search.search.trim() != '') {
          this.apiService.findLikeBook(this.checkedAuthor, this.checkedBook, search.search, this.pageEvent ? this.pageEvent.pageSize : 10).subscribe((result: any) => {
            this.books = result.content;
            this.length = result.numberOfElements;
            this.resourcesLoaded = false;
          });
        } else {
          this.findPage();
        }
      }, (error: any) => {
        this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
        this.resourcesLoaded = false;
      });
  }

  //recupera um iten de ppaginação atualizado
  onPageChange(event: any) {
    this.pageEvent = event;
    this.findPage();
  }

  //seta o recurso de paginação
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  //recupera um livro para edição
  edit(book: any) {
    this.bookService.upInsert(book);
  }

  //novo livro
  newBook() {
    this.bookService.new();
  }

    //novo livro
    newAuthor() {
      this.authorService.new();
    }

  //deleta um livro e recarrega a a lista de livros
  delete(id: number) {
    this.apiService.delete(id).subscribe((result: any) => {
      this.findPage();     
      this.toastr.success('Livro excluido!', 'Sucesso!', this.position);
    });
  }
}
