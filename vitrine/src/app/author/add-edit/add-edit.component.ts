import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorServiceService } from 'src/app/service/author-service.service';
import { AuthorSonsumerApiService } from 'src/app/service/author-sonsumer-api.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditAuthorComponent implements OnInit {
  title = 'author';
  position = { positionClass:'toast-bottom-right' };
  resourcesLoaded = false;
  formEdit: FormGroup = new FormGroup({});
  authors: any;
  author: any;
  constructor(private apiService: AuthorSonsumerApiService,
    private authorService: AuthorServiceService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiService.findAllAutors().subscribe((result: any) => {
      this.authors = result;
      this.insertForm();
    });

    this.formEdit = this.authorService.formEdit;
    this.initValidation();
  }

  //insere os itens para edição
  private insertForm() {
    let author = this.formEdit;
  }

  //salva ou atualiza livros
  saveOrUpdate() {
    this.resourcesLoaded = true;
    let id = this.formEdit.get('id').value;
    if (id != '')
      this.author = { id: this.formEdit.get('id').value, firstName: '', lastName: '' }
    else
      this.author = { firstName: '', lastName: ''}

    this.author.firstName = this.formEdit.get('firstName').value;
    this.author.lastName = this.formEdit.get('lastName').value;

    if (this.validations() === 0) {
      this.apiService.upsert(this.author).subscribe((result: any) => {
        this.toastr.success('Author salvo!', 'Sucesso!', this.position);
        this.authorService.new();
        this.insertForm();
        this.formEdit = this.authorService.formEdit;
        if (id != '')
          setTimeout(() => {
            this.router.navigateByUrl('/author');
          }, 1000);
          this.resourcesLoaded = false;
      }, (error: any) => {
        this.toastr.error('Impossivel conectar o servidor!', 'Error!', this.position);
        this.resourcesLoaded = false;
      });
    }
  }

  //valida o formulario de cadastro de autores
  validations() {
    let status=0;
    if (this.formEdit.get('firstName').value === '') {
      this.toastr.warning('Informe o primeiro nome', 'Validação', this.position);
      this.formEdit.get('firstName').setErrors({ incorrect: true });
      status = 1;
    }

    if (this.formEdit.get('lastName').value === '') {
      this.toastr.warning('Informe o ultimo nome do autor', 'Validação', this.position);
      this.formEdit.get('lastName').setErrors({ incorrect: true });      
      status = 1;
    }

    if (status===1)
      this.resourcesLoaded = false;

    return status
  }

  //inicia os itens para validação com recurso de css style
  initValidation(){
    this.formEdit.get('firstName').setErrors({ incorrect: false });
    this.formEdit.get('lastName').setErrors({ incorrect: false });
  }
  get validation() { return this.formEdit.controls; }
}
