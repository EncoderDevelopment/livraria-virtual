import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookSonsumerApiService {

  constructor(private http: HttpClient) { }

  /*
    classe que prove endpoinst de consumo de serviços
  */

  findPage(book: boolean, author: boolean, pageSize: any, page: any) {
    let params: any = {};

    if (author === true)
      params['author'] = 'author';
    if (book === true)
      params['title'] = 'title';

    params['size'] = pageSize;
    params['page'] = page;
    params = this.convertObjToHttpParams(params);
    return this.http.get(`${environment.urlService}book/findPage/?`, { params });
  }

  findLikeBook(book: boolean, author: boolean, search: String, pageSize: any) {
    let params: any = {};

    if (author === true)
      params['author'] = 'author';
    if (book === true)
      params['title'] = 'title';

    params['search'] = search;
    params['size'] = pageSize;
    params['page'] = 0;
    params = this.convertObjToHttpParams(params);

    return this.http.get(`${environment.urlService}book/findLikeBook/?`, { params });
  }

  findAllAutors() {
    let params: any = {};
    params = this.convertObjToHttpParams(params);
    return this.http.get(`${environment.urlService}author/findAll/?`, { params });
  }

  upsert(entity: any) {
    return this.http.put(`${environment.urlService}book/saveOrUpdate?`, entity);
  }

  delete(id: number) {
    return this.http.delete(`${environment.urlService}book/delete/${id}`);
  }

  private convertObjToHttpParams(args?: any) {
    let params = new HttpParams();
    if (!!args) {
      Object.keys(args).forEach(key => params = params.append(key, args[key]));
    }
    return params;
  }

}
