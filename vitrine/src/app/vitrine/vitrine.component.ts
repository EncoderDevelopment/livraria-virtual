import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { BookSonsumerApiService } from '../service/book-sonsumer-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vitrine',
  templateUrl: './vitrine.component.html',
  styleUrls: ['./vitrine.component.css']
})
export class VitrineComponent implements OnInit {
  title = 'vitrine';
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
    private toastr: ToastrService) {}

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

  //pesquisa com recurso de ppaginação
  private findPage() {
    console.log(this.pageEvent);
    this.resourcesLoaded = true;    
    this.apiService.findPage(this.checkedBook, this.checkedAuthor, this.pageEvent?this.pageEvent.pageSize:10, this.pageEvent ? this.pageEvent.pageIndex : 0).subscribe((result: any) => {      
      this.books = result.content;
      this.length = result.numberOfElements;
      this.resourcesLoaded = false;
    }, (error: any) => {
      this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
      this.resourcesLoaded = false;
    });
  }

  //pesquisa com like pelo titulo do livro
  findLikeBook() {
    this.resourcesLoaded = true;
    this.filterData.valueChanges
      .pipe(debounceTime(400))
      .subscribe((search: any) => {
        if (search.search && search.search.trim() != '') {
          this.apiService.findLikeBook(this.checkedBook, this.checkedAuthor,  search.search, this.pageEvent?this.pageEvent.pageSize:10).subscribe((result: any) => {            
            this.books = result.content;
            this.length = result.numberOfElements;
            this.resourcesLoaded = false;
          });
        }else{
          this.findPage();
        }
      }, (error: any) => {
        this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
        this.resourcesLoaded = false;
      });
  }

  //recupera o recurso de paginação
  onPageChange(event: any){
    this.pageEvent=event;
    this.findPage();
  }

  //implementa o paginador de recursos
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

}
