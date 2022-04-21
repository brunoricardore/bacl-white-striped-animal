import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<I, O> {

  constructor(
    private readonly http: HttpClient
  ) { }

  protected _endpoint = 'string';

  public fetchOne(id: string): Observable<O> {
    return this.http.get<O>(`${this._endpoint}/${id}`);
  }

  public fetchAll(id: string, queryParams: {[k: string]: any} ): Observable<O> {
    return this.http.get<O>(`${this._endpoint}/${id}`, {params: queryParams});
  }

  public create(data: I): Observable<O> {
    return this.http.post<O>(`${this._endpoint}`, data);
  }

  public update(id: string, data: I): Observable<O> {
    return this.http.put<O>(`${this._endpoint}/${id}`, data);
  }

  public delete(id: string, data: I): Observable<O> {
    return this.http.delete<O>(`${this._endpoint}/${id}`, data);
  }


}
