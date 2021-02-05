import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  /*
    classe de serviço para auxiloar na maanutenção de livros 

   */

  formEdit: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    isbn: new FormControl('', [Validators.required]),
    authorId: new FormControl('', [Validators.required]),
    author: new FormGroup({})
  });

  author: FormGroup = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  })

  constructor() { }

  //recupera itens para edição ou inserção
  upInsert(book: any) {

    this.formEdit.controls['id'].setValue(book.id);
    this.formEdit.controls['title'].setValue(book.title);
    this.formEdit.controls['isbn'].setValue(book.isbn);
    this.formEdit.controls['authorId'].setValue(book.authorId);
    if (book.author && book.author != null) {
      this.author.controls['id'].setValue(book.author.id);
      this.author.controls['firstName'].setValue(book.author.firstName);
      this.author.controls['lastName'].setValue(book.author.lastName);
      this.formEdit.controls['author'] = this.author;
    }
  }

  //novo item
  new() {
    this.formEdit = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      authorId: new FormControl('', [Validators.required]),
      author: new FormGroup({
        id: new FormControl(''),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required])
      })
    });

    this.author = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    })
  }
}
