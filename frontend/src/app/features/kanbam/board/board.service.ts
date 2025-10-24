import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Columns } from '@type/types';

@Injectable({
	providedIn: 'root',
})
export class BoardService {
	constructor(private http: HttpClient) {}
  
	url = 'http://localhost:3000/column/with-cards';

	fetchColumnsWithCards(){
		return this.http.get<Columns[]>(this.url);
	}
}
