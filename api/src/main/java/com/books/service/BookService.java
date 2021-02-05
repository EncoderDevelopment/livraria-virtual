package com.books.service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.swing.text.html.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.books.client.AuthorRestClient;
import com.books.client.BookRestClient;
import com.books.entity.BookEntity;
import com.google.gson.GsonBuilder;

import feign.FeignException.NotFound;

/**
 * 
 * @author Davi Roberto
 * @apiNote prove a camada de serviço para a regra de negocio refrente aos
 *          livros
 *
 */
@Service
public class BookService {

	@Autowired
	private BookRestClient bookRestClient;

	@Autowired
	private AuthorRestClient authorRestClient;

	/**
	 * 
	 * @param pageable
	 * @param sort
	 * @return lista paginada de livros com autores
	 */
	public Page<BookEntity> findPage(Pageable pageable, Optional<String> author, Optional<String> title) {
		Optional<Map<String, Integer>> size = bookRestClient.countBooks();
		Optional<List<BookEntity>> books = Optional.of(
				bookRestClient.findPage(pageable.getPageSize(), (pageable.getPageSize() * pageable.getPageNumber())));
		
		books.get().forEach(b -> {
			Optional<Integer> idBook = Optional.of(0);
			try {
				if (Objects.nonNull(b.getAuthorId())) {
					b.setAuthor(Optional.of(authorRestClient.findById(b.getAuthorId())));
					b.setFirstName(b.getAuthor().get().getFirstName());
					idBook = Optional.of(b.getId());
				}
			} catch (NotFound e) {
				bookRestClient.delete(idBook.get());
			}
		});

		// ordena pelo primeiro nome do autor
		if (author.isPresent())
			return new PageImpl<BookEntity>(books.get().stream().sorted(Comparator.comparing(BookEntity::getFirstName))
					.collect(Collectors.toList()), pageable, size.get().get("count"));

		// ordena por titulo de livro
		if (title.isPresent())
			return new PageImpl<BookEntity>(books.get().stream().sorted(Comparator.comparing(BookEntity::getTitle))
					.collect(Collectors.toList()), pageable, size.get().get("count"));

		return new PageImpl<BookEntity>(books.get(), pageable, size.get().get("count"));
	}

	/***
	 * 
	 * @param pageable
	 * @param search
	 * @return retorna lista de books conforme os parametros de pesquisa
	 * @apiNote a api de books usa o metodo like com case sensitive
	 */
	public Page<BookEntity> findLikeBook(Pageable pageable, Optional<String> author, Optional<String> title,
			Optional<String> search) {
		Optional<Map<String, Integer>> size = bookRestClient.countBooks();
		Optional<List<BookEntity>> books = Optional
				.of(bookRestClient.findLikeTitle(search.isPresent() ? search.get().toUpperCase() : " "));
		books.get().forEach(b -> {
			if (Objects.nonNull(b.getAuthorId()))
				b.setAuthor(Optional.of(authorRestClient.findById(b.getAuthorId())));
		});

		return new PageImpl<BookEntity>(books.get(), pageable, size.get().get("count"));
	}

	/***
	 * 
	 * @param json
	 * @return retorna zero se tudo ocorreu bem, em caso de falaha envia para o
	 *         handle de tratamento de erros
	 */
	public Object saveOrUpdate(Optional<String> json) {
		if (json.isPresent()) {
			BookEntity book = new GsonBuilder().create().fromJson(json.get(), BookEntity.class);
			book.setTitle(book.getTitle().toUpperCase());
			bookRestClient.saveOrUpdate(book);
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
		bookRestClient.delete(id);
		return 0;
	}

}
