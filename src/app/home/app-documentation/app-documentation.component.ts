import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import * as marked from 'marked'; // npm install marked
import { SafeHtml } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-app-documentation',
  imports: [CommonModule, RouterLink],
  templateUrl: './app-documentation.component.html',
  styleUrl: './app-documentation.component.css'
})
export class AppDocumentationComponent {
  title = "Immerse yourself in the magic of our culinary world";

  readmeContent: SafeHtml;

  constructor(private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar

  ) {
    this.readmeContent = this.sanitizer.bypassSecurityTrustHtml(this.generateReadmeHtml());
  }
  
  showMessage(message: string) {
    this.snackBar.open(message, 'Затвори', {
      duration: 3000, // 3 секунди
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  private generateReadmeHtml(): string {
    return `
      <h1>🍽️ Food Planner App</h1>
      <p><em>Web application for meal planning and recipe management</em></p>

      <h2>🌐 Live Demo</h2>
      <p>Access the app here: <a href="https://gotvarska-kniga.vercel.app/" target="_blank">https://gotvarska-kniga.vercel.app/</a></p>
      <p>Test acc: <code>demo@test.com</code> / <code>demo123</code></p>

      <h2>🚀 Key Features</h2>
      <ul>
        <li>Dietary preference-based recipe search</li>
        <li>Weekly meal plan generation</li>
        <li>Automated dishes plan menu</li>
      </ul>

      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js v18+</li>
        <li>.NET 7 SDK</li>
        <li>MySQL Workbench 8.0</li>
      </ul>

      <h2>🛠 Technologies</h2>
      <h3>Frontend</h3>
      <ul>
        <li><strong>Core</strong>: HTML5, CSS/SCSS, Angular 19+ (TypeScript)</li>
        <li><strong>UI Libraries</strong>: Angular Material, Google Maps API, Swiper.js</li>
      </ul>

      <h3>Backend</h3>
      <ul>
        <li><strong>Local Development</strong>: .NET 7 Web API (C# 11) on port 5000, Entity Framework Core + MySQL</li>
        <li><strong>Cloud Services</strong>: Supabase (PostgreSQL + Auth), Node.js/Express on port 3000</li>
      </ul>

      <h3>DevOps & Tools</h3>
      <ul>
        <li>Docker Desktop</li>
        <li>Postman</li>
        <li>Vercel</li>
        <li>GitHub</li>
      </ul>

      <h2>⚙️ Local Setup (Windows)</h2>
      <ol>
        <li>Start JSON Server (port 3000):
          <pre><code>json-server --watch db.json --port 3000</code></pre>
        </li>
        <li>Run .NET Backend (port 5000):
          <pre><code>cd backend\ndotnet run</code></pre>
        </li>
        <li>Run Angular Frontend (port 4200):
          <pre><code>cd frontend\nng serve</code></pre>
        </li>
      </ol>

      <h2>🔑 Online Version Test Account</h2>
      <p>Email: <code>demo@test.com</code><br>
      Password: <code>demo123</code></p>

      <h2>📬 Contact</h2>
      <p>Please use Contact Form: <a href="https://gotvarska-kniga.vercel.app/contact-info" target="_blank">Contact Page : "https://gotvarska-kniga.vercel.app/contact-info" </a></p>
      <p>GitHub: <a href="https://github.com/taka87/gotvarska-kniga" target="_blank">Project Repository : "https://github.com/taka87/gotvarska-kniga"</a></p>
    `;
  }

  downloadReadme() {
    const blob = new Blob([this.generateReadmeText()], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'food-planner-documentation.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateReadmeText(): string {
    return `Food Planner App Documentation
=================================

Live Demo: https://gotvarska-kniga.vercel.app/
Test Account: demo@test.com / demo123

Key Features:
- Dietary preference-based recipe search
- Weekly meal plan generation
- Automated dishes plan menu

[Full content continues...]`;
  }
}
