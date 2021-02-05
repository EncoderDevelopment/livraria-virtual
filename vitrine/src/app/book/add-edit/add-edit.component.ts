import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookServiceService } from 'src/app/service/book-service.service';
import { BookSonsumerApiService } from 'src/app/service/book-sonsumer-api.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditBookComponent implements OnInit {
  title = 'books';
  position = { positionClass: 'toast-bottom-right' };
  resourcesLoaded = false;
  formEdit: FormGroup = new FormGroup({});
  authors: any;
  author: any;
  selectedAuthor: any = { id: '', firstName: '', lastName: '' };
  constructor(private apiService: BookSonsumerApiService,
    private bookService: BookServiceService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.findAllAutors().subscribe((result: any) => {
      this.authors = result;
      this.insertForm();
    });

    this.formEdit = this.bookService.formEdit;
    this.initValidation();
  }

  //insere os itens para edição
  private insertForm() {
    let author = this.formEdit.controls['author'];
    if (author != null) {
      this.selectedAuthor.id = author.get('id').value;
      this.selectedAuthor.firstName = author.get('firstName').value;
      this.selectedAuthor.lastName = author.get('lastName').value;
    }
  }

  //salva ou atualiza livros
  saveOrUpdate() {
    this.resourcesLoaded = true;
    let id = this.formEdit.get('id').value;
    if (id != '')
      this.author = { id: this.formEdit.get('id').value, title: '', isbn: '', authorId: '' }
    else
      this.author = { title: '', isbn: '', authorId: '' }

    this.author.title = this.formEdit.get('title').value;
    this.author.isbn = this.formEdit.get('isbn').value;
    this.author.authorId = this.formEdit.get('authorId').value;

    if (this.validations() === 0) {
      this.apiService.upsert(this.author).subscribe((result: any) => {
        this.toastr.success('Livro salvo!', 'Sucesso!', this.position);
        this.bookService.new();
        this.insertForm();
        this.formEdit = this.bookService.formEdit;
        if (id != '')
          setTimeout(() => {
            this.router.navigateByUrl('/book');
          }, 1000);
        this.resourcesLoaded = false;
      }, (error: any) => {
        this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
        this.resourcesLoaded = false;
      });
    }
  }

  //valida o formulario de cadastro de livros
  validations() {
    let status = 0;
    if (this.formEdit.get('title').value === '') {
      this.toastr.warning('Informe o titulo do livro', 'Validação', this.position);
      this.formEdit.get('title').setErrors({ incorrect: true });
      console.log(this.formEdit.get('title').errors.incorrect);
      status = 1;
    }

    if (this.formEdit.get('authorId').value === '') {
      this.toastr.warning('Informe o autor do livro', 'Validação', this.position);
      this.formEdit.get('authorId').setErrors({ incorrect: true });
      status = 1;
    }

    if (this.formEdit.get('isbn').value === '') {
      this.toastr.warning('Informe o isbn do livro', 'Validação', this.position);
      this.formEdit.get('isbn').setErrors({ incorrect: true });
      status = 1;
    }

    if (status === 1)
      this.resourcesLoaded = false;

    return status
  }

  //inicia os itens para validação com recurso de css style
  initValidation() {
    this.formEdit.get('title').setErrors({ incorrect: false });
    this.formEdit.get('isbn').setErrors({ incorrect: false });
    this.formEdit.get('authorId').setErrors({ incorrect: false });
  }
  get validation() { return this.formEdit.controls; }
}
