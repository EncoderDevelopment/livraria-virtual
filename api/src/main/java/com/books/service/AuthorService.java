package com.books.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.books.client.AuthorRestClient;
import com.books.entity.AuthorEntity;
import com.books.entity.BookEntity;
import com.google.gson.GsonBuilder;

/**
 * 
 * @author Davi Roberto
 * @apiNote prove a camada de serviço para a regra de negocio refrente aos
 *          livros
 *
 */
@Service
public class AuthorService {

	@Autowired
	private AuthorRestClient authorRestClient;

	/**
	 * 
	 * @param pageable
	 * @param sort
	 * @return lista paginada de livros com autores
	 */
	public List<AuthorEntity> findAll() {
		Optional<List<AuthorEntity>> authors = Optional.of(authorRestClient.findAll());
		return authors.get();
	}

	/**
	 * 
	 * @param pageable
	 * @param sort
	 * @return lista paginada de autores
	 */
	public Page<AuthorEntity> findPage(Pageable pageable) {
		Optional<Map<String, Integer>> size = authorRestClient.countAuthors();
		Optional<List<AuthorEntity>> authors = Optional.of(
				authorRestClient.findPage(pageable.getPageSize(), (pageable.getPageSize() * pageable.getPageNumber())));
		return new PageImpl<AuthorEntity>(authors.get(), pageable, size.get().get("count"));
	}

	/***
	 * 
	 * @param pageable
	 * @param search
	 * @return retorna lista de autores conforme os parametros de pesquisa
	 * @apiNote a api de books usa o metodo like com case sensitive
	 */
	public Page<AuthorEntity> findLikeBook(Pageable pageable, Optional<String> search) {
		Optional<Map<String, Integer>> size = authorRestClient.countAuthors();
		Optional<List<AuthorEntity>> authors = Optional
				.of(authorRestClient.findLikeTitle(search.isPresent() ? search.get().toUpperCase() : " "));

		return new PageImpl<AuthorEntity>(authors.get(), pageable, size.get().get("count"));
	}

	/***
	 * 
	 * @param json
	 * @return retorna zero se tudo ocorreu bem, em caso de falaha envia para o
	 *         handle de tratamento de erros
	 */
	public Object saveOrUpdate(Optional<String> json) {
		if (json.isPresent()) {
			AuthorEntity author = new GsonBuilder().create().fromJson(json.get(), AuthorEntity.class);
			author.setFirstName(author.getFirstName().toUpperCase());
			author.setLastName(author.getLastName().toUpperCase());
			authorRestClient.saveOrUpdate(author);
		}

		return 0;
	}

	/***
	 * 
	 * @param id
	 * @return retorna zero se tudo ocorreu bem, em caso de falaha envia para o
	 *         handle de tratamento de erros
	 */
	public Object delete(Integer id) {
		authorRestClient.delete(id);
		return 0;
	}

}
