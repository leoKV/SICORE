import { PolicesComponent } from './components/polices/polices.component';
import { ResourcesComponent } from './components/resources/resources.component';

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  DECLARATIONS_COMMONS,
  IMPORTS_COMMONS,
  PROVIDERS_COMMONS,
  ENTRY_COMPONENTS_COMMONS,
} from "./app-commons";
import {
  DECLARATIONS_LIBRARIES,
  IMPORTS_LIBRARIES,
  PROVIDERS_LIBRARIES,
  ENTRY_COMPONENTS_LIBRARIES,
} from "./app-libraries";
import { environment } from "src/environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { TestComponent } from "./components/test/test.component";


//Cargamos los mensajes de internacionalizacion
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, environment.uris.comunes.mensajes, '');
}

@NgModule({
  declarations: [
    AppComponent,
    DECLARATIONS_COMMONS,
    DECLARATIONS_LIBRARIES,
    LoginComponent,
    TestComponent,
    ResourcesComponent,
    PolicesComponent
  ],
  entryComponents: [ENTRY_COMPONENTS_COMMONS, ENTRY_COMPONENTS_LIBRARIES],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    IMPORTS_COMMONS,
    IMPORTS_LIBRARIES,
  ],
  providers: [PROVIDERS_COMMONS, PROVIDERS_LIBRARIES],
  bootstrap: [AppComponent],
})
export class AppModule {}
