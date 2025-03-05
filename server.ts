import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server';

////ако н ипотрябва за SSR ??
// // DOM имитация
// import * as domino from 'domino';
// const template = existsSync(join(process.cwd(), 'dist/gotvarska-kniga/browser/index.html')) 
//   ? join(process.cwd(), 'dist/gotvarska-kniga/browser/index.html') 
//   : '<!DOCTYPE html><html><head></head><body></body></html>';
// const win = domino.createWindow(template);
// (global as any).window = win;
// // (global as any).window = win as unknown as Window & typeof globalThis;
// (global as any).document = win.document;
// (global as any).navigator = win.navigator;

export function app(): express.Express {
  const server = express();
  const browserDistFolder = join(process.cwd(), 'dist/gotvarska-kniga/browser');
  const indexHtml = existsSync(join(browserDistFolder, 'index.original.html')) 
    ? join(browserDistFolder, 'index.original.html')
    : join(browserDistFolder, 'index.html');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.get('*.*', express.static(browserDistFolder, { maxAge: '1y' }));

  server.get('*', (req: express.Request, res: express.Response) => {
    renderApplication(bootstrap, {
      document: indexHtml,
      url: req.url,
      platformProviders: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] // Променете `extraProviders` на `platformProviders`
    }).then((html: string) => res.send(html)).catch((err: Error) => res.send(err));
  });

  return server;
}

const port = process.env['PORT'] || 4000;
const server = app();

server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});