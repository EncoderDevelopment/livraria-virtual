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

import com.books.entity.BookEntity;

/**
 * 
 * @author Davi Roberto
 * @apiNote cliente consumidor de api de livros
 *
 */

@FeignClient(name = "book", url = "https://bibliapp.herokuapp.com/api")
public interface BookRestClient {

	//lista todos com paginação
	@RequestMapping(method = RequestMethod.GET, value = "/books?filter[limit]={limit}&filter[skip]={skip}")
	List<BookEntity> findPage(@PathVariable("limit") Integer limit, @PathVariable("skip") Integer skip);

	//filtra por titulo com paginação
	@RequestMapping(method = RequestMethod.GET, value = "/books?filter[where][title][like]={search}")
	List<BookEntity> findLikeTitle(@PathVariable("search") String search);

	//total de itens
	@RequestMapping(method = RequestMethod.GET, value = "/books/count")
	Optional<Map<String, Integer>> countBooks();
	
	//salva ou atualiza
	@PostMapping("/books/replaceOrCreate")
	Optional<String> saveOrUpdate(@RequestBody BookEntity data);
	
	//deleta por id
	@DeleteMapping("/books/{id}")
	Optional<String> delete(@PathVariable("id") Integer id);
	
	
}
