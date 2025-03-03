import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

//SSR
(global as any).window = undefined;
(global as any).document = undefined;
(global as any).navigator = undefined;

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppComponent, config);

// export default bootstrap;