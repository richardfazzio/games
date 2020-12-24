import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HEADER_TITLES } from './common/constants';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';

const routes: Routes = [
  // Home Page
  { 
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    data: {
      title: HEADER_TITLES.HOME
    }
  },
  // Memory Game
  {
    path: 'memory',
    loadChildren: () => import('./pages/memory/memory.module').then(m => m.MemoryModule),
    data: {
      title: HEADER_TITLES.MEMORY
    }
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
    data: {
      title: HEADER_TITLES.NOT_FOUND
    }
  },
  // If No path exists redirect to not found
  { 
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
