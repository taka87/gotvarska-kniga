# 🍽️ Food Planner App  
*Web application for meal planning and recipe management*  

## 🌐 Live Demo  
Access the app here : https://gotvarska-kniga.vercel.app/   
Test acc: demo@test.com/demo123

## 🚀 Key Features  
- Dietary preference-based recipe search  
- Weekly meal plan generation  
- Automated dishes plan menu 

## Prerequisites
- Node.js v18+
- .NET 7 SDK
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
  - .NET 7 Web API (C# 11) on port 5000  
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
   ```cmd
   json-server --watch db.json --port 3000

2. Run .NET Backend - port 5000 (new Command Prompt window):
cd backend
dotnet run

3. Run Angular Frontend - port 4200 (new Command Prompt window):
cd frontend
ng serve


## 🔑 Online Version Test Account 
Email: `demo@test.com`  
Password: `demo123`

## 📬 Contact  
- Please use Contact Form: https://gotvarska-kniga.vercel.app/contact-info
- GitHub: https://github.com/taka87/gotvarska-kniga