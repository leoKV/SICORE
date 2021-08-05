//Archivo de importar librerias de terceros para app_modules
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { NZ_I18N, en_US } from "ng-zorro-antd";
import { MaterialModuleModule } from './material-module.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';

export const DECLARATIONS_LIBRARIES = [];

export const ENTRY_COMPONENTS_LIBRARIES = [];

export const IMPORTS_LIBRARIES = [
  FormsModule,
  ReactiveFormsModule,
  NgZorroAntdModule,
  MaterialModuleModule,
  MatSidenavModule,
  MatButtonModule,
  MatDividerModule,
  MatIconModule
];

export const PROVIDERS_LIBRARIES = [{ provide: NZ_I18N, useValue: en_US }];
