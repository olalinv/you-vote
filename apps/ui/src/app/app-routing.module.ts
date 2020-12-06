// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// App
import { MainLayoutComponent } from './_components/main-layout/main-layout.component';

const routes: Routes = [
  /* Main layout routes */
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'survey',
        loadChildren: () =>
          import('./survey/survey.module').then((m) => m.SurveyModule),
      },
    ],
  },

  /* No layout routes */
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  /* Not found redirection */
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
