package com.books.controller;

import java.util.List;
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

import com.books.entity.AuthorEntity;
import com.books.service.AuthorService;

@RestController
@RequestMapping(value = { "/api/author" })
public class AuthorController {

	@Autowired
	private AuthorService authorService;

	// lsita todos os autores com recurso de paginação
	@GetMapping({ "/findAll" })
	public ResponseEntity<List<AuthorEntity>> findPage() {
		return ResponseEntity.ok().body(authorService.findAll());
	}

	// lista todos os livros com recurso de paginação
	@GetMapping({ "/findPage" })
	public ResponseEntity<Object> findPage(Pageable pageable) {
		return ResponseEntity.ok().body(authorService.findPage(pageable));
	}

	// salva ou atualiza um livro
	@PutMapping("/saveOrUpdate")
	public ResponseEntity<Object> saveOrUpdate(@RequestBody String json) {
		return new ResponseEntity<>(authorService.saveOrUpdate(Optional.of(json)), HttpStatus.OK);
	}

	// pesquisa livros com like no titulo
	@GetMapping({ "/findLikeAuthor" })
	public ResponseEntity<Object> findLikeAuthor(Pageable pageable, Optional<String> search) {
		return ResponseEntity.ok().body(authorService.findLikeBook(pageable, search));
	}

	// deleta um livro
	@DeleteMapping({ "/delete/{id}" })
	public ResponseEntity<Object> delete(@PathVariable("id") Integer id) {
		return ResponseEntity.ok().body(authorService.delete(id));
	}

}
