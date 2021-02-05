package com.books.client;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.books.entity.AuthorEntity;

/**
 * 
 * @author Davi Roberto
 * @apiNote cliente consumidor de api de autores de livros
 *
 */
@FeignClient(name = "author", url = "https://bibliapp.herokuapp.com/api")
public interface AuthorRestClient {

	// lista todos os autores
	@RequestMapping(method = RequestMethod.GET, value = "/authors")
	List<AuthorEntity> findAll();

	// lista todos os autores
	@RequestMapping(method = RequestMethod.GET, value = "/authors/{id}")
	AuthorEntity findById(@PathVariable("id") Integer id);

	// lista todos com paginação
	@RequestMapping(method = RequestMethod.GET, value = "/authors?filter[limit]={limit}&filter[skip]={skip}")
	List<AuthorEntity> findPage(@PathVariable("limit") Integer limit, @PathVariable("skip") Integer skip);

	// filtra por firstName com paginação
	@RequestMapping(method = RequestMethod.GET, value = "/authors?filter[where][firstName][like]={search}")
	List<AuthorEntity> findLikeTitle(@PathVariable("search") String search);

	// total de itens
	@RequestMapping(method = RequestMethod.GET, value = "/authors/count")
	Optional<Map<String, Integer>> countAuthors();

	// salva ou atualiza
	@PostMapping("/authors/replaceOrCreate")
	Optional<String> saveOrUpdate(@RequestBody AuthorEntity data);

	// deleta por id
	@DeleteMapping("/authors/{id}")
	Optional<String> delete(@PathVariable("id") Integer id);
}
