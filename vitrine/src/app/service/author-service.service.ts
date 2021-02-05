import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {

  /*
    classe de serviço para auxiloar na maanutenção de livros 

   */

  formEdit: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  })

  constructor() { }

  //recupera itens para edição ou inserção
  upInsert(author: any){
    this.formEdit.controls['id'].setValue(author.id);
    this.formEdit.controls['firstName'].setValue(author.firstName);
    this.formEdit.controls['lastName'].setValue(author.lastName);
  }

  //novo item
  new(){
    this.formEdit = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    })
  }
}
