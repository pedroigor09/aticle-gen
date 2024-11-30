import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {}

  generatePdf(subject: string, theme: string): Observable<Blob> {
    // Enviar requisição GET para gerar o PDF
    return this.http.get(`http://localhost:8080/download?subject=${subject}&theme=${theme}`, {
      responseType: 'blob', // Espera receber o PDF como um arquivo binário
    });
  }

  downloadPdf(subject: string, theme: string): void {
    this.generatePdf(subject, theme).subscribe((pdfBlob) => {
      // Criando um link temporário para o download do PDF
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(pdfBlob);
      link.href = url;
      link.download = 'artigo.pdf';  // Nome do arquivo a ser baixado
      link.click();
      window.URL.revokeObjectURL(url);  // Liberar a URL após o uso
    });
  }
}
