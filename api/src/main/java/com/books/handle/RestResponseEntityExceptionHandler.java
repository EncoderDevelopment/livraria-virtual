package com.books.handle;

import java.net.NoRouteToHostException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/***
 * 
 * @author Davi Roberto
 * @apiNote A anotação @ControllerAdvice nos permite consolidar nossos
 *          múltiplos @ExceptionHandler s espalhados de antes em um único
 *          componente global de tratamento de erros.
 *
 */
@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

	/***
	 * 
	 * @param ex
	 * @param request
	 * @return HttpStatus
	 * @apiNote tratamento de erros de parametros na requisição
	 */
	@ExceptionHandler(value = { IllegalArgumentException.class, IllegalStateException.class })
	protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
		String bodyOfResponse = "Conflito de serviço";
		return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
	}

	/***
	 * 
	 * @param ex
	 * @param request
	 * @return HttpStatus
	 * @apiNote trata erros de conexão com LoopBack Api
	 */
	@ExceptionHandler(value = { NoRouteToHostException.class })
	protected ResponseEntity<Object> hostConect(RuntimeException ex, WebRequest request) {
		String bodyOfResponse = "Host indisponivel";
		return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.SERVICE_UNAVAILABLE, request);
	}
}
