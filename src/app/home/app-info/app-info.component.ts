import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-app-info',
  imports: [CommonModule, RouterLink],
  templateUrl: './app-info.component.html',
  styleUrl: './app-info.component.css'
})
export class AppInfoComponent {
title = "Key Challenges in Application Development & Developer Insights"

content1 = `

Приложението е създадено като демонстрационен проект (с основни функционалности) с цел да послужи като шаблон и да улесни потребителите при избора, комбинирането и подбора на хранителни продукти, като предоставя лесен и интуитивен начин за съставяне на здравословен и балансиран режим на хранене по предпочитание на потребителя за всеки вкус. Като включва разнотипни менюта и рецепти, както и начин на достъп към тях.<br><br>

<strong>Техническа част:</strong><br>
* Приложението е изградено по модел на основата на съвременните технологии от последно поколение за разработка на софтуер, както и необходимите за целта спомагателни инструменти при изграждането му.<br>
** Изграденото приложение използва следните програмни езици и софтуер при разработката си:<br>
<strong>Front-End изграден посредством:</strong><br>
- HTML 5;<br>
- CSS и SCSS за стилова организация;<br>
- Angular 19+, базиран на TypeScript и JavaScript, при изграждане на логическите функционалности.<br><br>

<strong>Back-End:</strong><br>
- Локално изградено REST API на .NET 7 с C# 11 и Entity Framework Core;<br>
- Релационна база данни MySQL Workbench 8.0;<br>
- В облачна среда приложението използва PostgreSQL, с бекенд сървър и API, изградени на Node.js.<br><br>

<strong>Допълнителни инструменти:</strong><br>
- Използвани при изграждане на приложението като Docker, Postman и др.;<br>
- Различни клиенти (GitHub, PostgreSQL и др.) за управление на базите данни и разработката;<br>
- Локално изграденото API и ресурсите на приложението са достъпни в GitHub репозитори.`;

  content2 = `

  Проектът обхваща целия процес по изграждане на съвременно, софтуерно решение с конкретна задача (подбор на разнотипни рецепти и лесен достъп и употребата им. Вж. Въведението), която включва:<br>
- Цялостно изграждане на софтуерно решение от "А" до "Я", т.е. създаването на приложение от 0, което включва потребителския интерфейс (UI/UX дизайн), през изграждането на бизнес логиката.<br>
- Инструменти, които осигуряват комуникацията и връзка с базата данни от потребителския интерфейс;<br>
- изграждането на самата база данни.<br>
- Осигуряване на основна сигурност и мащабируемост.<br><br>

<strong>Основната концепция при разработката е с мисъл за лесна поддръжка, както и е взето под внимание момент, в който ще има нужда от изграждане на допълнителни необходимости и имплементиране на разнотипни изисквания за нови функционалности по предпочитание на клиент.</strong><br><br>

- Даден е акцент върху интеграцията на основните алгоритми и структури от данни в използваните софтуерни инструменти по време на изграждане на приложението, за демонстрация на умения и креативност.<br>
- Способност за гъвкаво доразвитие на приложението и ясно структуриране при изграждането му. Както и оригинални идеи при цялостното изграждане на полезни идеи.<br>
- Чист и добре организиран код, използване на добри практики, UI/UX дизайн – интуитивен и добре изглеждащ интерфейс.<br>
- Скорост и производителност – оптимизация на заявки, добро зареждане и рендиране на данните.<br>
- "Респонзивност" – коректна работа на мобилни устройства и различни екрани.<br>
- Сигурност – защита на данните, добро управление на потребителски права.<br>
- Изграждане връзка с външни API клиенти като Google Maps.<br>
- Приложени са съвременни и модерни уеб технологии и помощни приложения от последно поколение при изграждането му.<br>
- Спазен е подход за добри практики за разделяне на логиката от визуалната част, което гарантира гъвкавост и лесна поддръжка.<br>
- Приложението работи с релационна база данни, което позволява добра мащабируемост и ефективно управление на информацията.<br>
- Използвани са локална и облачна база данни, които са разновидни и подчертават гъвкавостта на системата.`;

content3 = `

- Категоризиране на меню според предпочитнията на потребителя и лесното търсене и достъп до необходимия ресурс на данни;<br>
- Търсене по категории с добавен филтър към интерфейса за по-прецизно сортиране на резултатите;<br>
- Бърз и лесен достъп до предпочитани категории и конкретни менюта;<br>
- Оптимизация на заявки за подобряване на бързодействието;<br>
- Интерактивен и адаптивен интерфейс, който осигурява удобство на потребителя лесно и бързо действие;<br>
- Основни механизми за сигурност и управление на достъпа на потребители;<br>
- Сигурност и достъп - Приложението е проектирано за работа с потребители, като демонстрационна среда, която в същия момент използва инструменти за сигурност. Идеята е, че платформата осигурява надеждно удостоверяване на потребители и защита на информацията;<br>
- Изграден е интерфейс за потребители, който се адаптира към използването на приложението за обикновен потребител (user);<br>
- Обособена е роля за администраторски потребител (admin), с оглед за пълен контрол над приложението и използващите го. По този начин управлява и въведените ресурси/данни от различните потребители. Така може да контролира, следи, добавя, променя данни в приложението за отделните потребители, както да създава нови администраторски права при нужда за работа на допълнителни помощници;<br>
- Минимизиране на излишни ресурси за по-добра ефективност;<br>
- Приложението е разработено така, че лесно да бъде разширено с нови функционалности при нужда, в тази връзка е възможно добавяне на допълнителни модули: като анализ на хранителни стойности, персонализирани препоръки и API интеграции за автоматично зареждане на продукти.<br>
- Основата на приложението е гъвкава и позволява надграждане според нуждите на клиентите и динамиката на пазара.`;

content4 = `

В проекта се постигна утвърждение и допълването на налични знания, както своевременно обогатяване и доусъвършенстване на практическия опит с нови умения. Целия поток от изграждане на приложението е целеустремен с оглед придобиване на опит в реален процес в изграждане на пълноценно потребителско приложение от "А" до "Я". Включени са техники за правилно структуриране на програмния код, оптимизиране на производителността и прилагане на добри практики (design patterns & coding patterns) в разработката на софтуер. Като по пътя на изграждане на цялостно функциониращо приложение не е пропуснат моментът от богата гама на предизвикателства, при изпълнението на проекта, които са очаквани в процеса на разработка на всяко подобно приложение. Неизбежен е момента в този аспект за поява на различни технически и концептуални предизвикателства от разнотипен вид, за които по пътя на изграждането на приложението е намерено решението.<br><br>
В хода на разработката е постигнат баланс между сигурността и достъпността на платформата, прилагайки съвременни методи за удостоверяване и защита на потребителските данни.`;

content5 = `

Взимайки под внимание изградената база. Основната идея е да се предложи ефективно решение за планиране на хранителния режим, като се вземат предвид предпочитанията и вкуса в ежедневното хранително меню на всеки потребител.<br><br>
Приложението има потенциал да бъде внедрено в различни бизнес сценарии, като например:<br>
- Персонализирани услуги за планиране на хранителни режими;<br>
- Интеграция със супермаркети за автоматично попълване на списъци за пазаруване;<br>
- Разширяване с функции за проследяване на хранителни навици;<br>
- Архитектурата е гъвкава и позволява адаптация според нуждите на даден бизнес модел или клиент;`;

contentEN = {
  section1: `

  The application has been created as a demonstration project (with basic functionalities) to serve as a template and facilitate users in selecting, combining, and choosing food products. It provides an easy and intuitive way to create a healthy and balanced diet plan according to the user's preferences for every taste. It includes various menus and recipes, as well as different access methods to them.<br><br>

  <strong>Technical Part:</strong><br>
  * The application is built based on modern, next-generation technologies for software development, along with the necessary supporting tools for its construction.<br>
  ** The developed application utilizes the following programming languages and software in its development:<br>
  <strong>Front-End built with:</strong><br>
  - HTML 5;<br>
  - CSS and SCSS for style organization;<br>
  - Angular 19+, based on TypeScript and JavaScript, for implementing the logical functionalities.<br><br>

  <strong>Back-End:</strong><br>
  - Locally built REST API on .NET 7 with C# 11 and Entity Framework Core;<br>
  - Relational database MySQL Workbench 8.0;<br>
  - In a cloud environment, the application uses PostgreSQL, with a backend server and API built on Node.js.<br><br>

  <strong>Additional Tools:</strong><br>
  - Used in the development of the application, such as Docker, Postman, and others;<br>
  - Various clients (GitHub, PostgreSQL, etc.) for database management and development;<br>
  - The locally built API and application resources are accessible in a GitHub repository.<br>
`,
section2: `

  The project covers the entire process of building a modern software solution with a specific task (selection of diverse recipes and easy access and use of them. See Introduction), which includes:<br>
  - The complete development of a software solution from "A" to "Z," i.e., creating an application from scratch. This encompasses the user interface (UI/UX design), the development of business logic;<br>
  - Tools that enable communication and connection with the database from the user interface;<br>
  - As well as the construction of the database;<br>
  - Also ensures fundamental security and scalability.<br>

  <strong>The core concept behind the development is focused on easy maintenance while taking into account the potential need for building additional features and implementing various new functionality requirements based on client preferences.</strong><br><br>

  - Emphasis is placed on the integration of essential algorithms and data structures in the software tools used during application development to demonstrate skills and creativity;<br>
  - Capability for flexible further development of the application, with clear structuring in its construction, as well as original ideas in the overall development of useful functionalities;<br>
  - Clean and well-organized code, following best practices; UI/UX design – intuitive and visually appealing interface;<br>
  - Speed and performance – query optimization, fast loading, and rendering of data;<br>
  - Responsiveness – proper operation on mobile devices and different screen sizes;<br>
  - Security – data protection and effective user rights management;<br>
  - Establishing connections with external API clients such as Google Maps;<br>
  - The application is built using contemporary and modern web technologies and cutting-edge auxiliary applications;<br>
  - A best-practice approach has been followed in separating logic from the visual layer, ensuring flexibility and easy maintenance;<br>
  - The application works with a relational database, enabling good scalability and efficient information management;<br>
  - Both local and cloud databases are used, highlighting the system’s flexibility.<br>
`,
section3: `

- Categorization of the menu according to the user's preferences and easy searching and access to the necessary data resource;<br>
- Searching by category with an added filter to the interface for more precise sorting of results;<br>
- Quick and easy access to preferred categories and specific menus;<br>
- Optimization of queries to improve performance;<br>
- Interactive and adaptive interface that ensures user convenience for easy and fast operation;<br>
- Basic security mechanisms and user access management;<br>
- Security and access – The application is designed for working with users as a demonstration environment while at the same time utilizing security tools. The idea is that the platform provides reliable user authentication and information protection;<br>
- A user interface has been built that adapts to the use of the application for a regular user (user);<br>
- A role for an administrative user (admin) has been designated, ensuring full control over the application and its users. This way, the admin manages the entered resources/data from different users. They can monitor, add, modify data within the application for individual users, as well as create new administrative rights if needed for additional assistants;<br>
- Minimization of unnecessary resources for better efficiency;<br>
- The application is developed in a way that allows easy expansion with new functionalities when needed.<br>
- In this regard, it is possible to add additional modules such as:<br>
- Nutritional value analysis;<br>
- Personalized recommendations;<br>
- API integrations for automatic product loading;<br>
- The foundation of the application is flexible and allows for scaling according to client needs and market dynamics.<br>
`,
section4: `

In the project, the consolidation and enrichment of existing knowledge were achieved, as well as the timely enhancement and refinement of practical experience with new skills. The entire process of building the application was goal-oriented, aiming to gain experience in a real-world process of creating a fully functional user application from "A" to "Z." Techniques for proper structuring of the code, performance optimization, and the application of best practices (design patterns & coding patterns) in software development were incorporated. Along the way of building a fully operational application, no moment was missed in addressing the wide range of challenges encountered during the project's execution, which are expected in the development process of any such application. The emergence of various technical and conceptual challenges of diverse types was inevitable, and solutions were found during the development of the application.<br>

During the development phase, a balance was achieved between security and accessibility, applying modern authentication methods and data protection mechanisms for users.<br>
`,
section5: `

Taking into account the established foundation, the main goal is to offer an effective solution for meal planning, considering users' preferences and tastes in their daily food intake.<br><br>

The application has the potential to be implemented in various business scenarios, such as:<br>
- Personalized meal planning services tailored to individual needs;<br>
- Integration with supermarkets for automatic generation of shopping lists;<br>
- Expansion with features for tracking eating habits and providing nutritional insights;<br>
- The flexible architecture allows adaptation to specific business models or client requirements, ensuring scalability and customization;<br>
`,
};

  constructor(private sanitizer: DomSanitizer) {}

  formatText(text: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
