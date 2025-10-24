import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Columns } from '@type/types';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3000/columns';

  fetchColumnsWithCards() {
    return this.http.get<Columns[]>(`${this.baseUrl}/with-cards`);
  }

  createColumn(columnTitle: string) {
    return this.http.post<Columns>(`${this.baseUrl}`, {
      title: columnTitle,
    })
  }
}
