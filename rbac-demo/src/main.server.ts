import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config as serverConfig } from './app/app.config.server';

export default function bootstrap(context: BootstrapContext) {
  // 👇 pass the context directly (NOT { context })
  return bootstrapApplication(AppComponent, serverConfig, context);
}
