import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {HomeModule} from "./pages/home/home.module";
import {RouteGuard} from "./shared/guard/route.guard";

const routes: Routes = [
  {path: 'success', loadChildren: () => import('./pages/success/success.module').then(m => m.SuccessModule), canActivate: [RouteGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HomeModule // Carregando a rota principal usando Eager mode, não faz sentido haha
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
