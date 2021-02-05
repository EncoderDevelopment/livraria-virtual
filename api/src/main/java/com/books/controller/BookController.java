package com.books.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.books.service.BookService;

@RestController
@RequestMapping(value = { "/api/book" })
public class BookController {

	@Autowired
	private BookService bookService;

	//lista todos os livros com recurso de paginação
	@GetMapping({ "/findPage"})
	public ResponseEntity<Object> findPage(Pageable pageable, Optional<String> author, Optional<String> title) {
		return ResponseEntity.ok().body(bookService.findPage(pageable, author, title ));
	}
	
	//salva ou atualiza um livro
	@PutMapping("/saveOrUpdate")
	public ResponseEntity<Object> saveOrUpdate(@RequestBody String json){
		return new ResponseEntity<>(bookService.saveOrUpdate(Optional.of(json)), HttpStatus.OK);		
	}

	//pesquisa livros com like no titulo
	@GetMapping({ "/findLikeBook"})
	public ResponseEntity<Object> findLikeBook(Pageable pageable, Optional<String> author, Optional<String> title, Optional<String> search) {
		return ResponseEntity.ok().body(bookService.findLikeBook(pageable, author, title, search));
	}
	
	//deleta um livro
	@DeleteMapping({ "/delete/{id}"})
	public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
		return ResponseEntity.ok().body(bookService.delete(id));
	}
}
