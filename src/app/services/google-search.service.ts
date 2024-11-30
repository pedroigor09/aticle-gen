import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleSearchService {
    private apiUrl = 'http://localhost:8080'; // Apenas o endereço base do backend

  constructor(private http: HttpClient) {}

  // Método para buscar artigos
  searchArticles(subject: string, theme: string): Observable<string[]> {
    const params = {
      subject: subject,
      theme: theme,
    };
    return this.http.get<string[]>(`${this.apiUrl}/search`, { params }); // Endpoint de busca de artigos
  }

  // Método para gerar e baixar o PDF
  generatePdf(subject: string, theme: string): Observable<Blob> {
    const params = {
      subject: subject,
      theme: theme,
    };

    return this.http.get<Blob>(`${this.apiUrl}/download`, {
        params,
        responseType: 'blob' as 'json',
      });
    }
}
