import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';  
import { PdfService } from './pdf.service';  
import { FormsModule } from '@angular/forms';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, 
  providers: [PdfService],  
  imports: [
    HttpClientModule,  
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,  
    RouterOutlet,
    FormsModule,  
    SearchBarComponent, 
  ]
})
export class AppComponent {
  title = 'minha-app';  
}
