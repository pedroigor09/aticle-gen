import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule
import { FormsModule } from '@angular/forms';  // Importando FormsModule para usar ngModel
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Importando o MatProgressSpinnerModule
import { PdfService } from '../pdf.service';   // Importando o serviço para se comunicar com o backend
import { HttpErrorResponse } from '@angular/common/http';  // Importando o tipo de erro

@Component({
  selector: 'app-search-bar',
  standalone: true,  // Definindo o componente como standalone
  imports: [
    CommonModule,  // Adicionando o CommonModule aqui
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatProgressSpinnerModule
  ],  
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  subject: string = '';
  theme: string = '';
  loading: boolean = false;  // Variável de controle de loading

  // Injetando o serviço PdfService no construtor
  constructor(private pdfService: PdfService) {}

  // Função chamada ao clicar no botão de "Baixar PDF"
  downloadPDF() {
    if (this.subject && this.theme) {
      this.loading = true;  // Mostra o spinner
      console.log(`Buscando PDF para o assunto: ${this.subject} e tema: ${this.theme}`);

      // Chamando o serviço para gerar o PDF
      this.pdfService.generatePdf(this.subject, this.theme).subscribe({
        next: (response: Blob) => {
          console.log('Resposta do backend:', response);

          // Criando um link para download
          const blob = new Blob([response], { type: 'application/pdf' });
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = 'artigo.pdf';
          link.click();
          window.URL.revokeObjectURL(url); // Liberando a URL criada
          this.loading = false;  // Esconde o spinner
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro na requisição:', error);  // Logando erro
          alert('Erro ao baixar o PDF. Tente novamente!');
          this.loading = false;  // Esconde o spinner mesmo em caso de erro
        }
      });
    } else {
      alert('Por favor, preencha os campos de assunto e tema!');
    }
  }
}
