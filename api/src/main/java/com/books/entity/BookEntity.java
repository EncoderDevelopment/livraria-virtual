package com.books.entity;

import java.util.Optional;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookEntity {

	private Integer id;
	private String title;
	private String isbn;
	private Integer authorId;
	private String firstName;
	private Optional<AuthorEntity> author;

}
