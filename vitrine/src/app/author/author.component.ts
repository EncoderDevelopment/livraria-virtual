import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';
import { AuthorServiceService } from '../service/author-service.service';
import { AuthorSonsumerApiService } from '../service/author-sonsumer-api.service';
import { BookServiceService } from '../service/book-service.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  title = 'authors';
  position = { positionClass:'toast-bottom-right' };
  authors: any;
  resourcesLoaded = false;
  params: any = {};
  filterData: FormGroup;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(private apiService: AuthorSonsumerApiService,
    private authorService: AuthorServiceService, 
    private bookService: BookServiceService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.filterData = new FormGroup({ search: new FormControl(null) });
    this.findPage();
    this.findLikeBook();
  }

  //busca com recurso de paginação
  private findPage() {
    this.resourcesLoaded = true;
    this.apiService.findPage(this.pageEvent ? this.pageEvent.pageSize : 10, this.pageEvent ? this.pageEvent.pageIndex : 0).subscribe((result: any) => {
      this.authors = result.content;
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
          this.apiService.findLikeBook(search.search, this.pageEvent ? this.pageEvent.pageSize : 10).subscribe((result: any) => {
            this.authors = result.content;
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

  //recupera um autor para edição
  edit(author: any) {
    this.authorService.upInsert(author);
  }

  //novo autor
  newAuthor() {
    this.authorService.new();
  }

    //novo autor
    newBook() {
      this.bookService.new();
    }

  //deleta um autor e recarrega a a lista de livros
  delete(id: number) {
    this.apiService.delete(id).subscribe((result: any) => {
      this.findPage();     
      this.toastr.success('Livro excluido!', 'Sucesso!', this.position);
    });
  }
}
