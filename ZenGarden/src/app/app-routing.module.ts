import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'title',
    loadChildren: () => import('./title/title.module').then( m => m.TitlePageModule)
  },
  {
    path: '',
    redirectTo: 'title',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },

  {
    path: 'todo-details',
    loadChildren: () => import('./pages/todo-details/todo-details.module').then( m => m.TodoDetailsPageModule)
  },  
  { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' 
  },
  { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' 
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
