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

  constructor(
    private sanitizer: DomSanitizer,
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
      <h1>🍽️ Recipe Book App</h1>
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
        <li>.NET 8 SDK</li>
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
        <li><strong>Local Development</strong>: .NET 8 Web API (C# 11) on port 5000, Entity Framework Core + MySQL</li>
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

      <h2> 🌐 Project resources:</h2> 
      <p>GitHub: <a href="https://github.com/taka87/gotvarska-kniga" target="_blank">Project Repository : https://github.com/taka87/gotvarska-kniga</a></p>
      <p>GitHub Local API: <a href="https://github.com/taka87/recipe-book-api" target="_blank">Project Repository : https://github.com/taka87/recipe-book-api</a></p>
    
      <h2>📬 Contact: </h2>
      <p>Please use Contact Form: <a href="https://gotvarska-kniga.vercel.app/contact-info" target="_blank">Contact Page : https://gotvarska-kniga.vercel.app/contact-info </a></p>
      `;
  }

  downloadReadme() {
    const blob = new Blob([this.generateReadmeText()], { type: 'text/plain' }); // създава виртуален файл и го подготвя за изтегляне... 
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recipe-book-documentation.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private generateReadmeText(): string {
    return `
# 🍽️ Recipe Book App  
*Web application for meal planning and recipe management*  

## 🌐 Live Demo  
Access the app here : https://gotvarska-kniga.vercel.app/   
Test acc: demo@test.com / pass: demo123

## 🚀 Key Features  
- Dietary preference-based recipe search  
- Weekly meal plan generation  
- Automated dishes plan menu 

## Prerequisites
- Node.js v18+
- .NET 8 SDK
- MySQL Workbench 8.0

## 🛠 Technologies  

### **Frontend**  
- **Core**:  
  - HTML5, CSS/SCSS  
  - Angular 19+ (TypeScript)  
- **UI Libraries**:  
  - Angular Material  
  - Google Maps API  
  - Swiper.js (touch-friendly sliders for recipes)    

### **Backend**  
- **Local Development**:  
  - .NET 8 Web API (C# 11) on port 5000  
  - Entity Framework Core + MySQL Workbench 8.0  
- **Cloud Services**:  
  - Supabase (PostgreSQL database + Authentication)  
  - Node.js/Express mock server on port 3000   

### **DevOps & Tools**  
- Docker Desktop  
- Postman  
- Vercel  
- GitHub  

### ⚙️ Local Setup (Windows)
1. Start JSON Server (port 3000):
   ***cmd
   json-server --watch db.json --port 3000

2. Run .NET Backend - port 5000 (new Command Prompt window):
cd backend
dotnet run

3. Run Angular Frontend - port 4200 (new Command Prompt window):
cd frontend
ng serve


## 🔑 Online Version Test Account 
Email: "demo@test.com"  
Password: "demo123"

## 🌐 Project resources: 
- GitHub: https://github.com/taka87/gotvarska-kniga
- Github Local API: https://github.com/taka87/recipe-book-api

## 📬 Contact:
- Please use Contact Form: https://gotvarska-kniga.vercel.app/contact-info`
  }
}
