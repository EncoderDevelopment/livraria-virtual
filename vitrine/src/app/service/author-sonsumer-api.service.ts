import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorSonsumerApiService {

  constructor(private http: HttpClient) { }

  /*
    classe que prove endpoinst de consumo de serviços
  */

  findPage(pageSize: any, page: any) {
    let params: any = {};
    params['size'] = pageSize;
    params['page'] = page;
    params = this.convertObjToHttpParams(params);
    return this.http.get(`${environment.urlService}author/findPage/?`, { params });
  }

  findLikeBook(search: String, pageSize: any) {
    let params: any = {};
    params['search'] = search;
    params['size'] = pageSize;
    params['page'] = 0;
    params = this.convertObjToHttpParams(params);

    return this.http.get(`${environment.urlService}author/findLikeAuthor/?`, { params });
  }

  findAllAutors() {
    let params: any = {};
    params = this.convertObjToHttpParams(params);
    return this.http.get(`${environment.urlService}author/findAll/?`, { params });
  }

  upsert(entity: any) {
    return this.http.put(`${environment.urlService}author/saveOrUpdate?`, entity);
  }

  delete(id: number) {
    return this.http.delete(`${environment.urlService}author/delete/${id}`);
  }

  private convertObjToHttpParams(args?: any) {
    let params = new HttpParams();
    if (!!args) {
      Object.keys(args).forEach(key => params = params.append(key, args[key]));
    }
    return params;
  }

}
