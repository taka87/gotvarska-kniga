import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

//vercel
if (typeof localStorage === 'undefined') {
    class FakeStorage {
      private store: Record<string, string> = {};
      
      get length() {
        return Object.keys(this.store).length;
      }
  
      getItem(key: string): string | null {
        return this.store[key] || null;
      }
  
      setItem(key: string, value: string): void {
        this.store[key] = value;
      }
  
      removeItem(key: string): void {
        delete this.store[key];
      }
  
      clear(): void {
        this.store = {};
      }
  
      key(index: number): string | null {
        return Object.keys(this.store)[index] || null;
      }
    }
  
    globalThis.localStorage = new FakeStorage() as Storage;
  }