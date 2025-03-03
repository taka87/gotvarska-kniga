import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { renderApplication } from '@angular/platform-server';
import bootstrap from './src/main.server';

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