import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiURL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer api-key'
    })
  };

  constructor(private http: HttpClient) { }

  getResponse(prompt: string): Observable<any> {
    return this.http.post<any>(this.apiURL, {
      prompt: prompt,
      max_tokens: 60
    }, this.httpOptions);
  }
}